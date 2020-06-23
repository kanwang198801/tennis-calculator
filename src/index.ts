import fs from 'fs';
import { MatchType, PlayerType } from './types';

const matches: MatchType[] = [];
const players: PlayerType[] = [];

// Make sure we got a filename on the command line.
// if (process.argv.length < 3) {
//    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
//    process.exit(1);
//  }
// Read the file and print its contents.
//  const filename = process.argv[2];
fs.readFile('./pub/full_tournament.txt', 'utf8', function (err, data) {
   if (err) throw err;
   console.log('OK: ');
   console.log(data);
});
