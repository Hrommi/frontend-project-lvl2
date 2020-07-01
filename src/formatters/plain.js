import isObject from 'lodash/isPlainObject.js';

const stringify = (value) => {
  if (!isObject(value)) {
    return typeof value === 'string' ? `'${value}'` : value;
  }
  return '[complex value]';
};

const genName = (name, parentName) => (
  parentName
    ? `${parentName}.${name}`
    : name
);

const typesMapping = {
  nested: (item, parentName, render) => {
    const name = genName(item.name, parentName);
    return render(item.children, name, render);
  },
  unchanged: () => '',
  added: (item, parentName) => {
    const name = genName(item.name, parentName);
    const value = stringify(item.value);
    return `Property '${name}' was added with value: ${value}`;
  },
  deleted: (item, parentName) => {
    const name = genName(item.name, parentName);
    return `Property '${name}' was deleted`;
  },
  changed: (item, parentName) => {
    const name = genName(item.name, parentName);
    const valueAfter = stringify(item.valueAfter);
    const valueBefore = stringify(item.valueBefore);
    return `Property '${name}' was changed from ${valueBefore} to ${valueAfter}`;
  },
};

const render = (data, parentName) => (
  data
    .map(({ type, ...item }) => (
      typesMapping[type](item, parentName, render)
    ))
    .filter(Boolean)
    .join('\n')
);

export default (data) => render(data, '');
