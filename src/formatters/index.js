import stylishRender from './stylish.js';
import plainRender from './plain.js';
import jsonRender from './json.js';

const formatsMapping = {
  stylish: stylishRender,
  plain: plainRender,
  json: jsonRender,
};

const render = (data, format) => formatsMapping[format](data);

export default render;
