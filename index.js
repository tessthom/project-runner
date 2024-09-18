#!/usr/bin/env node

import chokidar from 'chokidar';
import debounce from 'lodash.debounce';
import fs from 'fs';
import prog from 'caporal';
import { spawn } from 'child_process';

// config caporal
prog
  .version('1.0.0')
  .argument('[filename]', 'Name of file to execute')
  .action(async ({ filename }) => {
    const name = filename || 'index.js'; // default to 'index.js' if no filename provided

    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Cannot find file: ${name}`); // throw custom error
    }

    let proc;
    const run = debounce((path) => {
      if (proc) { // prevent prior versions of program from continuing to run
        proc.kill();
      }
      proc = spawn('node', [name], { stdio: 'inherit' }); // run file `name`. wire stdio streams from child process to this program.
    }, 100);
    
    chokidar.watch('.')
      .on('add', run) // debounce to avoid printing files at program init
      .on('change', run)
      .on('unlink', run);
  });

prog.parse(process.argv);