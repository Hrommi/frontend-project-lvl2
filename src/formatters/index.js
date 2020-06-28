import stylishRender from './stylish.js';

const formatsMapping = {
  stylish: stylishRender,
};

const render = (data, format) => formatsMapping[format](data);

export default render;
