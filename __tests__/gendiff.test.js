import {
  test,
  expect,
  beforeAll,
  describe,
} from '@jest/globals';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const formats = ['stylish', 'plain', 'json'];
const extensions = ['json', 'yaml', 'ini'];
const getFixturePath = (name) => path.join(process.cwd(), '__fixtures__', name);

describe.each(formats)('%s format', (format) => {
  let expected;

  beforeAll(() => {
    expected = fs.readFileSync(getFixturePath(`${format}Result.txt`), 'utf-8');
  });

  test.each(extensions)('gendiff %s', (extension) => {
    const filepathBefore = getFixturePath(`before.${extension}`);
    const filepathAfter = getFixturePath(`after.${extension}`);
    const diff = genDiff(filepathBefore, filepathAfter, format);
    expect(diff).toBe(expected.trim());
  });
});
