export interface MatchType {
   matchId?: string;
   player0Name?: string;
   player1Name?: string;
   player0WinCount: number;
   player1WinCount: number;
   sets: SetType[];
   winner?: string;
   loser?: string;
   winnerWinSets?: number;
   loserWinSets?: number;
}
export interface SetType {
   player0WinCount: number;
   player1WinCount: number;
   games: GameType[];
}
export interface GameType {
   player0WinCount: number;
   player1WinCount: number;
}
export interface PlayerType {
   name: string;
   winCount: number;
   loseCount: number;
}
