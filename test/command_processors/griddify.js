import assert from 'assert';
import griddify from '../../src/command_processors/griddify.js';

const tests = [
  {
    description: 'run - <Invalid Format> - should return error - null',
    input: null,
    expected: 'error'
  },
  {
    description: 'run - <Invalid Format> - should return error - empty input',
    input: '',
    expected: 'error'
  },
  {
    description: 'run - <Invalid Format> - should return error - without proper input text',
    input: 'test',
    expected: 'error'
  },
  {
    description: 'run - <Invalid Format> - should return error - without proper input text',
    input: 'test string',
    expected: 'error'
  },
  {
    description: 'run - <Invalid Format> - with only 1 emoji',
    input: ':hello:',
    expected: 'error'
  },
  {
    description: 'run - <Invalid Format> - with only 1 emoji and text',
    input: ':hello: test',
    expected: 'error'
  },
  {
    description: 'run - <Invalid Format> - with only grid depth, 1 emoji, and text',
    input: '5 :hello: test',
    expected: 'error'
  },

  {
    description: 'run - <No Space Format> - no space format - with two emojis',
    input: ':hello::test:',
    expected: ':hello::hello::hello:\n:hello::test::hello:\n:hello::hello::hello:'
  },
  {
    description: 'run - <No Space Format> - no space format - with two emojis and grid depth',
    input: '1:hello::test:',
    expected: ':hello::hello::hello:\n:hello::test::hello:\n:hello::hello::hello:'
  },
  {
    description: 'run - <No Space Format> - with two emojis, grid depth, and extra text',
    input: '2:hello::test:this is superfluous',
    expected: ':hello::hello::hello::hello::hello:\n:hello::hello::hello::hello::hello:\n:hello::hello::test::hello::hello:\n:hello::hello::hello::hello::hello:\n:hello::hello::hello::hello::hello:'
  },

  {
    description: 'run - <Proper Format> - no space format - with two emojis',
    input: ':hello: :test:',
    expected: ':hello::hello::hello:\n:hello::test::hello:\n:hello::hello::hello:'
  },
  {
    description: 'run - <Proper Format> - no space format - with two emojis and grid depth',
    input: '2 :hello: :test:',
    expected: ':hello::hello::hello::hello::hello:\n:hello::hello::hello::hello::hello:\n:hello::hello::test::hello::hello:\n:hello::hello::hello::hello::hello:\n:hello::hello::hello::hello::hello:'
  },
  {
    description: 'run - <Proper Format> - with two emojis, grid depth, and extra text',
    input: '2 :hello: :test: this is extra text',
    expected: ':hello::hello::hello::hello::hello:\n:hello::hello::hello::hello::hello:\n:hello::hello::test::hello::hello:\n:hello::hello::hello::hello::hello:\n:hello::hello::hello::hello::hello:'
  }
]

describe('Griddify', () => {
    tests.forEach(test => {
      it(test.description, () => {
        assert.equal(griddify.run(test.input), test.expected);
      });
    });
});
