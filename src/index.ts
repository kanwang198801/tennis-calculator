import fs from 'fs';
import readline from 'readline';
import { MatchType, SetType, GameType, PlayerType } from './types';

const matches: MatchType[] = [];
let players: PlayerType[] = [];
let match: MatchType = { sets: [], player0WinCount: 0, player1WinCount: 0 };
let set: SetType = {
   games: [],
   player0WinCount: 0,
   player1WinCount: 0,
};
let game: GameType = {
   player0WinCount: 0,
   player1WinCount: 0,
};
let waitingNewMatch = false;

if (process.argv.length < 3) {
   console.log('Usage: node ' + process.argv[1] + ' FILENAME');
   process.exit(1);
}

try {
   const rl = readline.createInterface({
      input: fs.createReadStream(process.argv[2]),
      output: process.stdout,
      terminal: false,
   });
   rl.on('line', (line: string) => {
      if (!line) return;
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
               players.push({ name: playerName, winCount: 0, loseCount: 0 });
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
            game = { player0WinCount: 0, player1WinCount: 0 };
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
            set = { games: [], player0WinCount: 0, player1WinCount: 0 };
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
            console.info(`Score Match ${match.matchId}`);
            console.info(`Games Player ${match.winner}`);
            console.info(`${match.winner} defeated ${match.loser}`);
            console.info(
               `${match.winnerWinSets} sets to ${match.loserWinSets}`
            );
            console.info(players);
            console.info(match);
            matches.push(match);
            waitingNewMatch = true;
            match = {
               sets: [],
               player0WinCount: 0,
               player1WinCount: 0,
            };
         }
      }
   });
} catch (err) {
   console.error(err);
}
