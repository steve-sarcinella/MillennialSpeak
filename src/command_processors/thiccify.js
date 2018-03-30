const _ = require('lodash');

const INPUT_PATTERN = /((\d+?)\W)?(.+)/;
const ERROR_MESSAGE = '_p r o b l e m s_';
const SPACE = ' ';

const run = (rawText) => {
  if (!rawText) return ERROR_MESSAGE;

  let matches = INPUT_PATTERN.exec(rawText);

  if (!matches || !matches[3]) return ERROR_MESSAGE;

  let spacerSize = matches[2] || 1;
  let spacer = _.repeat(SPACE, spacerSize);
  let resultText = _.map(matches[3], (letter) => letter+spacer).join('');

  //removing last spacer is easier than going through the ugly for loop
  resultText = resultText.substring(0, resultText.length - spacerSize);

  return `_${resultText}_`;
}

const cmd = '/thiccify';
module.exports = { cmd, run };
