import Set from './set';

class Match {
   matchId: string;
   player0Name: string;
   player1Name: string;
   player0WinCount: number;
   player1WinCount: number;
   sets: Set[];
   winner: string;
   loser: string;
   winnerWinSets: number;
   loserWinSets: number;
   constructor(
      matchId = '',
      player0Name = '',
      player1Name = '',
      player0WinCount = 0,
      player1WinCount = 0,
      sets = [],
      winner = '',
      loser = '',
      winnerWinSets = 0,
      loserWinSets = 0
   ) {
      this.matchId = matchId;
      this.player0Name = player0Name;
      this.player1Name = player1Name;
      this.player0WinCount = player0WinCount;
      this.player1WinCount = player1WinCount;
      this.sets = sets;
      this.winner = winner;
      this.loser = loser;
      this.winnerWinSets = winnerWinSets;
      this.loserWinSets = loserWinSets;
   }
}

export default Match;
