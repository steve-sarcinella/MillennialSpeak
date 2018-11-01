const _ = require('lodash');

const INPUT_PATTERN = /((\d+?)\W?)?((\:.+?\:)\W?(\:.+?\:))/;
const ERROR_MESSAGE = 'I\'m not cool enough for this';
const SPACE = ' ';

const run = (rawText) => {
  if (!rawText) return ERROR_MESSAGE;

  let matches = INPUT_PATTERN.exec(rawText);

  if (!matches || !matches[3]) return ERROR_MESSAGE;
  // console.log(matches);
  let gridDepth = matches[2] || 1;
  let sideLen = 1 + (gridDepth*2);
  let grid = _.fill(new Array(parseInt(sideLen)));

  for(let x = 0; x < sideLen; ++x) {
    grid[x] = _.fill(new Array(parseInt(sideLen)), matches[4]);
  }

  grid[gridDepth][gridDepth] = matches[5];

  _.forEach(grid, (row, index) => {
    grid[index] = row.join('');
  });

  grid = grid.join('\n');
  return grid;
}

const cmd = '/griddify';
module.exports = { cmd, run };
