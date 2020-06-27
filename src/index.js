import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullPath);
};

const isUnchanged = (value1, value2) => value1 === value2;

const isAdded = (obj, key) => !Object.prototype.hasOwnProperty.call(obj, key);

const isDeleted = (obj, key) => !Object.prototype.hasOwnProperty.call(obj, key);

export default (filepath1, filepath2) => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);

  const fileExtension1 = path.extname(filepath1).slice(1);
  const fileExtension2 = path.extname(filepath2).slice(1);

  const parsedData1 = parse(data1, fileExtension1);
  const parsedData2 = parse(data2, fileExtension2);

  const data1Keys = Object.keys(parsedData1);
  const data2Keys = Object.keys(parsedData2);
  const keys = [...new Set([...data1Keys, ...data2Keys])];
  const result = keys.map((key) => {
    const value1 = parsedData1[key];
    const value2 = parsedData2[key];
    if (isUnchanged(value1, value2)) {
      return `    ${key}: ${value1}`;
    }
    if (isAdded(parsedData1, key)) {
      return `  + ${key}: ${value2}`;
    }
    if (isDeleted(parsedData2, key)) {
      return `  - ${key}: ${value1}`;
    }
    return `  + ${key}: ${value2}\n  - ${key}: ${value1}`;
  });

  return `{\n${result.join('\n')}\n}`;
};
