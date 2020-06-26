

## Install

npm install

## Running the application against a txt file which store the raw match data.

### Start server, there are 3 options below:

### Print games summary

npm start full_tournament.txt

### Query a match

for example: npm start full_tournament.txt 'Score Match 01'

### Query a player

for example: npm start full_tournament.txt 'Games Player Person A'

#### Details of tennis scoring can be found online. See here for reference:  
https://en.wikipedia.org/wiki/Tennis_scoring_system

The variation used for this application is a best of 3 sets match, with first to 6 games wins a set. 

Details as follows:
* A tennis match is split up into points, games and sets.
* Winning a game requires a person to win 4 points, but they must be ahead by at least 2 points (deuce, advantage, game)
* The first player to win 6 games wins a set. I.e:
    * Players do NOT need to be ahead by 2 to win a set (6-5 finishes a set) 
    * There is nothing special about that final game in a set. All games are the same.
* Best of 3 sets (first to 2 sets wins)
