const extensionsMapping = {
  json: JSON.parse,
};

const parse = (data, extension) => extensionsMapping[extension](data);

export default parse;
