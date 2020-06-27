import { test, expect, beforeAll } from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const extensions = ['json', 'yaml', 'ini'];
const getFixturePath = (name) => path.join(process.cwd(), '__fixtures__', name);

let expected;

beforeAll(() => {
  expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
});

test.each(extensions)('gendiff %s', (extension) => {
  const filepathBefore = getFixturePath(`before.${extension}`);
  const filepathAfter = getFixturePath(`after.${extension}`);
  const diff = genDiff(filepathBefore, filepathAfter);
  expect(diff).toBe(expected.trim());
});
