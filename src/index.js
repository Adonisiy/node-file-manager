import os from 'node:os';
import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ls } from './ls.js';
import { up } from './up.js';

const default_dir = os.homedir();
let current_dir = default_dir;
export { current_dir };

let userName = process.argv[2].match(/^--username=([\w\s]+)/);
if (userName) {
  userName = userName[1];
  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${current_dir}`);

  const root = path.dirname(fileURLToPath(import.meta.url));

  process.stdin.on('data', async (data) => {
    const command = getArgs(data.toString());
    if (command[0] == '.exit') process.exit();
    else {
      try {
        switch (command[0]) {
          case 'ls':
            ls();
            break;
          case 'up':
            current_dir = up(current_dir);
            break;
          default:
            throw new Error('Invalid input');
        }
      } catch (e) {
        console.log(e.message);
        console.log(`You are currently in ${current_dir}`);
      }
    }
  });

  process.on('SIGINT', () => process.exit());

  process.on('exit', () =>
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
  );
} else {
  console.log('Incorrect input of flag');
}

function getArgs(text) {
  let command = text.match(
    /\s*(\.?\w+)(\s+([\w\\\/-]+|"[\w\\\/\s-]+")(\s+([\w\\\/-]+|"[\w\\\/\s-]+"))?)?/
  );
  return [command[1], command[3], command[5]].map((s) =>
    s ? s.replace(/"/g, '') : s
  );
}
