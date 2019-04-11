/* global beforeEach test expect */

const _ = require('lodash');
_.mixin(require('../lodash.deep_ops'));

let object;

beforeEach(() => {
  object = {
    find: 'me',
    level_1: {
      find: 'me',
      level_2: {
        find: 'me'
      }
    }
  };
});

test('implements the forInDeep function', () => {
  expect(_.filterKeyDeep).toBeDefined();
});

test('iterates only thru filtered keys', () => {
  const keys = [];

  _.filterKeyDeep(object, 'find', (value, key, path) => { keys.push(path); });

  expect(_.every(keys, value => value.match(/find$/))).toBeTruthy();
  expect(keys).toHaveLength(3);
});

test('iterates fine on arrays', () => {
  object = {
    array: [{
      find: 'me'
    }, {
      child: 'me'
    }]
  };
  const keys = [];

  _.filterKeyDeep(object, 'find', (value, key, path) => { keys.push(path); });

  expect(keys).toEqual(['array[0].find']);
});

test('calls the iteration function only if it matches key', () => {
  const keys = [];

  _.filterKeyDeep(object, 'find', (value, key) => { keys.push(key); });

  expect(keys).toEqual(['find', 'find', 'find']);
});

test('calls the iterator with the right path', () => {
  const keys = [];

  _.filterKeyDeep(object, 'find', (value, key, path) => { keys.push(path); });

  expect(keys).toEqual(
    ['find', 'level_1.find', 'level_1.level_2.find'],
  );
});

test('calls the iterator with the right object', () => {
  object = {
    array: [{
      find: 'me'
    }, {
      child: 'me'
    }]
  };
  let resp;

  _.filterKeyDeep(object, 'find', (value, key, path, obj) => { resp = obj; });

  expect(resp).toEqual(object.array[0]);
});
