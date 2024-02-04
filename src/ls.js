import { readdir } from 'node:fs/promises';
import { current_dir } from './index.js';

export function ls() {
  try {
    readdir(current_dir, { withFileTypes: true }).then((result) => {
      let list = [];
      for (let s of result) {
        let obj = {};
        obj.name = s.name;
        obj.type = s.isFile() ? 'file' : 'directory';
        list.push(obj);
      }
      list.sort((a, b) => {
        if (a.type > b.type) return 1;
        else if (a.type < b.type) return -1;
        else return a.name - b.name;
      });
      console.table(list);
      console.log(`You are currently in ${current_dir}`);
    });
  } catch (e) {
    console.log('Operation failed');
  }
}
