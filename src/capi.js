// docs: https://github.dowjones.net/newsroom-innovation/capi-generator
const { CapiGenerator, Image } = require('capi-generator');

module.exports = async function () {
  const cg = new CapiGenerator();

  const image = new Image({
    photoUrl: 'https://www.wsj.com/ai2html/04fdd31a-79d5-4c27-9eaf-5190147016fb/fallback_app.jpg',
    width: 600,
    height: 1358,
    alternate_text: '',
    credit: '',
    caption: '',
  });
  cg.addToBody(image);

  return cg;
};