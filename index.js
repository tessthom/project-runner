#!/usr/bin/env node

import chokidar from 'chokidar';
import debounce from 'lodash.debounce';
import prog from 'caporal';

// config caporal
prog
  .version('1.0.0')
  .argument('[filename]', 'Name of file to execute')
  .action(({ filename }) => {
    const name = filename || 'index.js'; // default if no filename provided

    const run = debounce((path) => {
      console.log(`FILE ${path} ADDED`);
    }, 100);
    
    chokidar.watch('.')
      .on('add', run) // debounce to avoid printing files at program init
      .on('change', run)
      .on('unlink', run);
  });

prog.parse(process.argv);