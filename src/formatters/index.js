import stylishRender from './stylish.js';
import plainRender from './plain.js';

const formatsMapping = {
  stylish: stylishRender,
  plain: plainRender,
};

const render = (data, format) => formatsMapping[format](data);

export default render;
