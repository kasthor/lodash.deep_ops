/* global beforeAll test expect */
const _ = require('lodash');
_.mixin(require('../lodash.for_in_deep'));

let object;

beforeAll(() => {
  object = {
    find: 'me',
    level_1: {
      find: 'me',
      level_2: {
        find: 'me',
      },
    },
  };
});

test('implements the forInDeep function', () => {
  expect(_.forInDeep).toBeDefined();
});

test('iterates thru all the keys', () => {
  const keys = [];

  _.forInDeep(object, (value, key) => { keys.push(key); });

  expect(keys.sort()).toEqual(
    ['find', 'level_1', 'find', 'level_2', 'find'].sort(),
  );
});

test('passes thru the paths of each element', () => {
  const keys = [];

  _.forInDeep(object, (value, key, path) => { keys.push(path); });

  expect(keys.sort()).toEqual(
    ['find', 'level_1', 'level_1.find', 'level_1.level_2', 'level_1.level_2.find'].sort(),
  );
});
