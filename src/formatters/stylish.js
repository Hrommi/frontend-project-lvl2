import isObject from 'lodash/isPlainObject';

const genIndent = (level, char) => {
  const indent = '    '.repeat(level);
  return char ? `${indent.slice(2)}${char} ` : indent;
};

const stringify = (value, level) => {
  if (!isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  return [
    '{',
    ...keys.map((key) => `${genIndent(1)}${key}: ${stringify(value[key], level + 1)}`),
    '}',
  ].join(`\n${genIndent(level)}`);
};

const typesMapping = {
  nested: (item, level, render) => {
    const indent = genIndent(level);
    const value = `{\n${render(item.children, level + 1, render)}\n${indent}}`;
    return `${indent}${item.name}: ${value}`;
  },
  unchanged: (item, level) => {
    const indent = genIndent(level);
    const value = stringify(item.value, level);
    return `${indent}${item.name}: ${value}`;
  },
  added: (item, level) => {
    const indent = genIndent(level, '+');
    const value = stringify(item.value, level);
    return `${indent}${item.name}: ${value}`;
  },
  deleted: (item, level) => {
    const indent = genIndent(level, '-');
    const value = stringify(item.value, level);
    return `${indent}${item.name}: ${value}`;
  },
  changed: (item, level) => {
    const { valueBefore, valueAfter, ...rest } = item;
    const deletedItem = typesMapping.deleted({ ...rest, value: valueBefore }, level);
    const addedItem = typesMapping.added({ ...rest, value: valueAfter }, level);
    return `${deletedItem}\n${addedItem}`;
  },
};

const render = (data, level) => (
  data.map(({ type, ...item }) => (
    typesMapping[type](item, level, render)
  )).join('\n')
);

export default (data) => `{\n${render(data, 1)}\n}`;
