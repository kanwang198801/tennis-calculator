import fs from 'fs';
import readline from 'readline';
import { getMatch, getAll } from './controller/match';
import { getPlayer } from './controller/player';
import Player from './models/player';
import Game from './models/game';
import Set from './models/set';
import Match from './models/match';

const matches: Match[] = [];
let players: Player[] = [];
let match = new Match();
let set = new Set();
let game = new Game();
let waitingNewMatch = false;

const rl = readline.createInterface({
   input: fs.createReadStream(process.argv[2]),
   output: process.stdout,
   terminal: false,
});

const processData = async () => {
   try {
      for await (const line of rl) {
         if (!line) continue;

         if (line.includes('Match')) {
            match = {
               ...match,
               matchId: line.split(': ')[1],
            };
            waitingNewMatch = false;
         } else if (line.includes('Person')) {
            const playerNames = line.split(' vs ');

            playerNames.map((playerName) => {
               const foundPlayer = players.find(
                  (player) => player.name === playerName
               );
               if (!foundPlayer) {
                  const player = new Player(playerName);
                  players.push(player);
               }
            });

            match.player0Name = playerNames[0];
            match.player1Name = playerNames[1];
         } else {
            if (waitingNewMatch) return;
            if (parseInt(line) === 0) {
               game.player0WinCount++;
            }
            if (parseInt(line) === 1) {
               game.player1WinCount++;
            }
            const isGameFinish =
               Math.abs(game.player0WinCount - game.player1WinCount) >= 2;

            if (
               isGameFinish &&
               (game.player0WinCount >= 4 || game.player1WinCount >= 4)
            ) {
               game.player0WinCount > game.player1WinCount
                  ? set.player0WinCount++
                  : set.player1WinCount++;
               set.games.push(game);
               game = new Game();
            }

            const isSetFinish =
               set.player0WinCount === 6 || set.player1WinCount === 6;

            if (isSetFinish) {
               set.player0WinCount > set.player1WinCount
                  ? match.player0WinCount++
                  : match.player1WinCount++;

               players = players.map((player) => {
                  if (player.name == match.player0Name) {
                     const newPlayer = {
                        ...player,
                        winCount: player.winCount + set.player0WinCount,
                        loseCount: player.loseCount + set.player1WinCount,
                     };
                     return newPlayer;
                  }
                  if (player.name == match.player1Name) {
                     const newPlayer = {
                        ...player,
                        winCount: player.winCount + set.player1WinCount,
                        loseCount: player.loseCount + set.player0WinCount,
                     };
                     return newPlayer;
                  }
                  return player;
               });
               match.sets.push(set);
               set = new Set();
            }
            const isMatchFinish =
               match.player0WinCount === 2 || match.player1WinCount === 2;
            if (isMatchFinish) {
               match.player0WinCount > match.player1WinCount
                  ? ((match.winner = match.player0Name),
                    (match.loser = match.player1Name),
                    (match.winnerWinSets = match.player0WinCount),
                    (match.loserWinSets = match.player1WinCount))
                  : ((match.winner = match.player1Name),
                    (match.loser = match.player0Name),
                    (match.winnerWinSets = match.player1WinCount),
                    (match.loserWinSets = match.player0WinCount));

               matches.push(match);
               waitingNewMatch = true;
               match = new Match();
            }
         }
      }
   } catch (err) {
      console.error(err);
   }
};

const main = async () => {
   if (process.argv.length < 3) {
      console.log('COMMAND IS NOT CORRECT');
      process.exit(1);
   }
   await processData();

   if (process.argv[3]) {
      if (process.argv[3].includes('Score Match')) {
         const querySplited = process.argv[3].split(' ');
         const id = querySplited[querySplited.length - 1];
         getMatch(matches, id);
      } else if (process.argv[3].includes('Games Player')) {
         const querySplited = process.argv[3].split(' ');
         const name = `${querySplited[querySplited.length - 2]} ${
            querySplited[querySplited.length - 1]
         }`;
         getPlayer(players, name);
      } else {
         console.info('QUERY IS NOT CORRECT');
      }
   } else {
      getAll(matches);
      // console.info(players);
   }
};

main();
