import Game from './game';

class Set {
   player0WinCount: number;
   player1WinCount: number;
   games: Game[];
   constructor(player0WinCount = 0, player1WinCount = 0, games = []) {
      this.player0WinCount = player0WinCount;
      this.player1WinCount = player1WinCount;
      this.games = games;
   }
}

export default Set;
