import assert from 'assert';
import thiccify from '../../src/command_processors/thiccify.js';

const tests = [
  {
    description: 'run - <Failure> - should return error - null',
    input: null,
    expected: '_p r o b l e m s_'
  },
  {
    description: 'run - <Failure> - should return error - empty input',
    input: '',
    expected: '_p r o b l e m s_'
  },
  {
    description: 'run - <Success> - single word - without spacer size',
    input: 'test',
    expected: '_t e s t_'
  },
  {
    description: 'run - <Success> - multi word - without spacer size',
    input: 'test this method',
    expected: '_t e s t   t h i s   m e t h o d_'
  },
  {
    description: 'run - <Success> - single word - with spacer size',
    input: '5 test',
    expected: '_t     e     s     t_'
  },
  {
    description: 'run - <Success> - multi word - with spacer size',
    input: '5 test this method',
    expected: '_t     e     s     t           t     h     i     s           m     e     t     h     o     d_'
  },
];

describe('Thiccify', () => {
    tests.forEach(test => {
      it(test.description, () => {
        assert.equal(thiccify.run(test.input), test.expected);
      });
    });
});
