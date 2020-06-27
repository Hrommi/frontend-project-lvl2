#!/usr/bin/env node

import commander from 'commander';
import genDiff from '../src/index.js';

const program = new commander.Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    const diff = genDiff(filepath1, filepath2, options);
    console.log(diff);
  })
  .parse(process.argv);
