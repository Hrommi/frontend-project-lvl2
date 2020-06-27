import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(fullPath);
};

const isUnchanged = (value1, value2) => value1 === value2;

const isAdded = (obj, key) => !Object.prototype.hasOwnProperty.call(obj, key);

const isDeleted = (obj, key) => !Object.prototype.hasOwnProperty.call(obj, key);

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(readFile(filepath1));
  const data2 = JSON.parse(readFile(filepath2));
  const data1Keys = Object.keys(data1);
  const data2Keys = Object.keys(data2);
  const keys = [...new Set([...data1Keys, ...data2Keys])];
  const result = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (isUnchanged(value1, value2)) {
      return `    ${key}: ${value1}`;
    }
    if (isAdded(data1, key)) {
      return `  + ${key}: ${value2}`;
    }
    if (isDeleted(data2, key)) {
      return `  - ${key}: ${value1}`;
    }
    return `  + ${key}: ${value2}\n  - ${key}: ${value1}`;
  });
  return `{\n${result.join('\n')}\n}`;
};
