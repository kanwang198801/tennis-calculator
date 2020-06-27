import Player from '../models/player';

export const getPlayer = (players: Player[], name: string) => {
   const player = players.find((player) => player.name === name);
   if (player) {
      console.info(`${player.winCount} ${player.loseCount}`);
   } else {
      console.info('NOT FOUND');
   }
};
