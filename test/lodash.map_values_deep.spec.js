/* globals beforeEach test expect */
const _ = require('lodash');
_.mixin(require('../lodash.deep_ops'));

let object;

beforeEach(() => {
  object = {
    key: 'value',
    level1: {
      key: 'value',
    },
  };
});

test('return an object', () => {
  const test = _.mapValuesDeep(object, x => x);

  expect(test).toBeInstanceOf(Object);
  expect(test.key).toEqual('value');
});

test('return value of level 0 modified', () => {
  const test = _.mapValuesDeep(object, x => `x${x}`);
  expect(test.key).toEqual('xvalue');
});

test('return value of level 1 modified', () => {
  const test = _.mapValuesDeep(object, x => `x${x}`);
  expect(test.level1.key).toEqual('xvalue');
});
