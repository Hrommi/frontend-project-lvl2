import yaml from 'js-yaml';

const extensionsMapping = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
};

const parse = (data, extension) => extensionsMapping[extension](data);

export default parse;
