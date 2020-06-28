import {
  test,
  expect,
  beforeAll,
  describe,
} from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const extensions = ['json', 'yaml', 'ini'];
const getFixturePath = (name) => path.join(process.cwd(), '__fixtures__', name);

describe('Stylish format', () => {
  let expected;

  beforeAll(() => {
    expected = fs.readFileSync(getFixturePath('stylishResult.txt'), 'utf-8');
  });

  test.each(extensions)('gendiff %s', (extension) => {
    const filepathBefore = getFixturePath(`before.${extension}`);
    const filepathAfter = getFixturePath(`after.${extension}`);
    const diff = genDiff(filepathBefore, filepathAfter, 'stylish');
    expect(diff).toBe(expected.trim());
  });
});

describe('Plain format', () => {
  let expected;

  beforeAll(() => {
    expected = fs.readFileSync(getFixturePath('plainResult.txt'), 'utf-8');
  });

  test.each(extensions)('gendiff %s', (extension) => {
    const filepathBefore = getFixturePath(`before.${extension}`);
    const filepathAfter = getFixturePath(`after.${extension}`);
    const diff = genDiff(filepathBefore, filepathAfter, 'plain');
    expect(diff).toBe(expected.trim());
  });
});

describe('JSON format', () => {
  let expected;

  beforeAll(() => {
    expected = fs.readFileSync(getFixturePath('jsonResult.txt'), 'utf-8');
  });

  test.each(extensions)('gendiff %s', (extension) => {
    const filepathBefore = getFixturePath(`before.${extension}`);
    const filepathAfter = getFixturePath(`after.${extension}`);
    const diff = genDiff(filepathBefore, filepathAfter, 'json');
    expect(diff).toBe(expected.trim());
  });
});
