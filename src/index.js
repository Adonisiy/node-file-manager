import os from 'node:os';
import process from 'node:process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const default_dir = os.homedir();
let current_dir = default_dir;

const userName = process.argv[2].match(/^--username=(\w+)/)[1];
console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You are currently in ${current_dir}`);

const root = path.dirname(fileURLToPath(import.meta.url));
const fileName = path.resolve(root, 'os.js');

process.stdin.on('data', (data) => {
  console.log(`You are currently in ${current_dir}`);
});

process.on('SIGINT', () => process.exit());

process.on('exit', () =>
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
);
