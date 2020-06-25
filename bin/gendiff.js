#!/usr/bin/env node

import commander from 'commander';

const program = new commander.Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .parse(process.argv);
