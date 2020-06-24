import { MatchType, PlayerType } from './types';

export const getMatch = (matches: MatchType[], id: string) => {
   const match = matches.find((match) => match.matchId === id);
   if (match) {
      console.info(`${match.winner} defeated ${match.loser}`);
      console.info(`${match.winnerWinSets} sets to ${match.loserWinSets}`);
   } else {
      console.info('NOT FOUND');
   }
};

export const getPlayer = (players: PlayerType[], name: string) => {
   const player = players.find((player) => player.name === name);
   if (player) {
      console.info(`${player.winCount} ${player.loseCount}`);
   } else {
      console.info('NOT FOUND');
   }
};

export const getAll = (matches: MatchType[]) => {
   matches.map((match) => {
      console.info(`Score Match ${match.matchId}`);
      console.info(`Games Player ${match.winner}`);
      console.info(`${match.winner} defeated ${match.loser}`);
      console.info(`${match.winnerWinSets} sets to ${match.loserWinSets}`);
      console.info('\n');
   });
};
