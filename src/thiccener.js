const thiccMatcher = /((\d+?)\W)?(.+)/;

const getThiccener = (thiccness) => {
  let thiccener = '';
  for (let i = 0; i < thiccness; ++i) thiccener += ' ';
  return thiccener;
};

const doThiccen = (text, thiccener) => {
  let result = '';
  for (let i = 0; i < text.length-1; ++i) {
    result += text[i] + thiccener;
  }
  result += text[text.length-1];
  return result;
}

const thiccen = (command) => {
  if (!command) return '_p r o b l e m s_';

  matches = thiccMatcher.exec(command);

  if (!matches[3]) return '_p r o b l e m s_';

  let thiccness = matches[2] || 1;
  let thiccener = getThiccener(thiccness);
  return `_${doThiccen(matches[3], thiccener)}_`;
};

module.exports = { thiccen };
