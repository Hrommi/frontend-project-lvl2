import yaml from 'js-yaml';
import ini from 'ini';

const extensionsMapping = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

const parse = (data, extension) => extensionsMapping[extension](data);

export default parse;
