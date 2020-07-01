import isObject from '../utils/isObject.js';

const stringify = (value) => {
  if (!isObject(value)) {
    return typeof value === 'string' ? `'${value}'` : value;
  }
  return '[complex value]';
};

const typesMapping = {
  added: (item) => {
    const value = stringify(item.value);
    return `Property '${item.name}' was added with value: ${value}`;
  },
  deleted: (item) => `Property '${item.name}' was deleted`,
  changed: (item) => {
    const value = stringify(item.value);
    const valueBefore = stringify(item.valueBefore);
    return `Property '${item.name}' was changed from ${valueBefore} to ${value}`;
  },
};

const flattenData = (data) => {
  const iter = (item, parentName) => {
    const name = parentName
      ? `${parentName}.${item.name}`
      : item.name;
    const currentItem = {
      ...item,
      name,
    };
    const currentChildren = item.type === 'nested'
      ? item.children.flatMap((child) => iter(child, name))
      : [];

    return [
      currentItem,
      ...currentChildren,
    ];
  };
  return data.flatMap((item) => iter(item, ''));
};

const render = (data) => {
  const flattenedData = flattenData(data);
  return flattenedData
    .filter(({ type }) => type !== 'unchanged' && type !== 'nested')
    .map(({ type, ...item }) => (
      typesMapping[type](item)
    )).join('\n');
};

export default render;
