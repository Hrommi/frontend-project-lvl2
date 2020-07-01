import fs from 'fs';
import path from 'path';
import isObject from 'lodash/isPlainObject';
import has from 'lodash/has';
import keys from 'lodash/keys';
import union from 'lodash/union';
import parse from './parsers.js';
import render from './formatters/index.js';

const isNested = (value1, value2) => isObject(value1) && isObject(value2);
const isUnchanged = (value1, value2) => value1 === value2;
const isAdded = (obj, key) => !has(obj, key);
const isDeleted = (obj, key) => !has(obj, key);

const getUnionKeys = (obj1, obj2) => union(keys(obj1), keys(obj2));

const genDiff = (before, after) => {
  const unionKeys = getUnionKeys(before, after);
  return unionKeys.map((key) => {
    const valueBefore = before[key];
    const valueAfter = after[key];
    if (isAdded(before, key)) {
      return { name: key, type: 'added', value: valueAfter };
    }
    if (isDeleted(after, key)) {
      return { name: key, type: 'deleted', value: valueBefore };
    }
    if (isUnchanged(valueBefore, valueAfter)) {
      return { name: key, type: 'unchanged', value: valueBefore };
    }
    if (isNested(valueBefore, valueAfter)) {
      const children = genDiff(valueBefore, valueAfter);
      return { name: key, type: 'nested', children };
    }
    return {
      name: key,
      type: 'changed',
      valueBefore,
      valueAfter,
    };
  });
};

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullPath, 'utf-8');
};

export default (filepath1, filepath2, format) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const fileExtension1 = path.extname(filepath1).slice(1);
  const fileExtension2 = path.extname(filepath2).slice(1);

  const parsedData1 = parse(data1, fileExtension1);
  const parsedData2 = parse(data2, fileExtension2);

  const diff = genDiff(parsedData1, parsedData2);

  return render(diff, format);
};
