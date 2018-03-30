const _ = require('lodash');

const ERROR_MESSAGE = ':clap: error :clap:';
const SPACE = ' ';
const CLAP = ':clap:';

const run = (rawText) => {
  if (!rawText) return ERROR_MESSAGE;

  let resultText = CLAP + SPACE + _.map(_.words(rawText), word => word + SPACE + CLAP + SPACE).join('');
  resultText = resultText.substring(0, resultText.length-1);

  return resultText;
}

const cmd = '/clappify';
module.exports = { cmd, run };
