import os from 'node:os';
import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const default_dir = os.homedir();
let current_dir = default_dir;

let userName = process.argv[2].match(/^--username=([\w\s]+)/);
console.log(process.argv[2]);
if (userName) {
  userName = userName[1];
  console.log(`Welcome to the File Manager, ${userName}!`);
  console.log(`You are currently in ${current_dir}`);

  const root = path.dirname(fileURLToPath(import.meta.url));
  const fileName = path.resolve(root, 'os.js');

  process.stdin.on('data', (data) => {
    const command = getArgs(data.toString());
    console.log(command);
    console.log(`You are currently in ${current_dir}`);
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
    /\s*(\w+)(\s+([\w\\\/-]+|"[\w\\\/\s-]+")(\s+([\w\\\/-]+|"[\w\\\/\s-]+"))?)?/
  );
  return [command[1], command[3], command[5]].map((s) =>
    s ? s.replace(/"/g, '') : s
  );
}
