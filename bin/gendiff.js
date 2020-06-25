#!/usr/bin/env node

import commander from 'commander';

const program = new commander.Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, options) => {
    console.log(`${filepath1} ${filepath2} ${options.format}`);
  })
  .parse(process.argv);
