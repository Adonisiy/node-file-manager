import path from 'node:path';

export function up(dir) {
  dir = path.resolve(dir, '..');
  dir = path.normalize(dir);
  console.log(`You are currently in ${dir}`);
  return dir;
}
