import { test, expect, beforeAll } from '@jest/globals';
import path from 'path';
import genDiff from '../src/index.js';

const extensions = ['json', 'yaml'];
const getFixturePath = (name) => path.join(process.cwd(), '__fixtures__', name);

let expected;

beforeAll(() => {
  expected = [
    '{',
    '    host: hexlet.io',
    '  + timeout: 20',
    '  - timeout: 50',
    '  - proxy: 123.234.53.22',
    '  - follow: false',
    '  + verbose: true',
    '}',
  ].join('\n');
});

test.each(extensions)('gendiff %s', (extension) => {
  const filepathBefore = getFixturePath(`before.${extension}`);
  const filepathAfter = getFixturePath(`after.${extension}`);
  const diff = genDiff(filepathBefore, filepathAfter);
  expect(diff).toBe(expected);
});
