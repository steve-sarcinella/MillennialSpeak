import assert from 'assert';
import clappify from '../../src/command_processors/clappify.js';

const tests = [
  {
    description: 'run - <Failure> - should return error - null',
    input: null,
    expected: ':clap: error :clap:'
  },
  {
    description: 'run - <Failure> - should return error - empty text',
    input: '',
    expected: ':clap: error :clap:'
  },
  {
    description: 'run - <Success> - should return formatted text',
    input: 'hello',
    expected: ':clap: hello :clap:'
  },
  {
    description: 'run - <Success> - should return formatted text',
    input: 'hello test person, how are you',
    expected: ':clap: hello :clap: test :clap: person :clap: how :clap: are :clap: you :clap:'
  },
]

describe('Clappify', () => {
    tests.forEach(test => {
      it(test.description, () => {
        assert.equal(clappify.run(test.input), test.expected);
      });
    });
});
