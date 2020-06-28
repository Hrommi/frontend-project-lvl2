import isObject from '../utils/isObject.js';

const genPadding = (level, char) => {
  const padding = '    '.repeat(level);
  return char ? `${padding.slice(2)}${char} ` : padding;
};

const stringify = (value, level) => {
  if (!isObject(value)) {
    return value;
  }
  const keys = Object.keys(value);
  return [
    '{',
    ...keys.map((key) => `${genPadding(1)}${key}: ${stringify(value[key], level + 1)}`),
    '}',
  ].join(`\n${genPadding(level)}`);
};

const typesMapping = {
  nested: (item, level, render) => {
    const padding = genPadding(level);
    const value = `{\n${render(item.children, level + 1, render)}\n${padding}}`;
    return `${padding}${item.name}: ${value}`;
  },
  unchanged: (item, level) => {
    const padding = genPadding(level);
    const value = stringify(item.value, level);
    return `${padding}${item.name}: ${value}`;
  },
  added: (item, level) => {
    const padding = genPadding(level, '+');
    const value = stringify(item.value, level);
    return `${padding}${item.name}: ${value}`;
  },
  deleted: (item, level) => {
    const padding = genPadding(level, '-');
    const value = stringify(item.value, level);
    return `${padding}${item.name}: ${value}`;
  },
  changed: (item, level) => {
    const { valueBefore, ...rest } = item;
    return `${typesMapping.deleted({ ...rest, value: valueBefore }, level)}\n${typesMapping.added(rest, level)}`;
  },
};

const render = (data, level) => (
  data.map(({ type, ...item }) => (
    typesMapping[type](item, level, render)
  )).join('\n')
);

export default (data) => `{\n${render(data, 1)}\n}`;
