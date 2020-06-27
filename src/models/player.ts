class Player {
   name: string;
   winCount: number;
   loseCount: number;
   constructor(name: string, winCount = 0, loseCount = 0) {
      this.name = name;
      this.winCount = winCount;
      this.loseCount = loseCount;
   }
}

export default Player;
