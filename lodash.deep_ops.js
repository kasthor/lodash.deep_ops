const _ = require('lodash');

module.exports = {
  forInDeep(object, path, iteratee) {
    if (_.isUndefined(iteratee)) {
      iteratee = path;
      path = '';
    }

    _.forIn(object, (value, key) => {
      let childPath = _.without([path, key], '');

      if (_.isArray(object)) {
        const idx = childPath.pop();
        childPath = `${childPath.join('.')}[${idx}]`;
      } else {
        childPath = childPath.join('.');
      }

      iteratee(value, key, childPath, object);

      if (_.isObject(value)) {
        _.forInDeep(value, childPath, iteratee);
      }
    });
  },
  filterKeyDeep(object, key, iteratee) {
    _.forInDeep(object, (v, k, p, o) => {
      if (key === k) iteratee(v, k, p, o);
    });
  },
  mapValuesDeep(object, iteratee) {
    return _.fromPairs(
      _.map(object,
        (v, k) => ((_.isObject(v))
          ? [k, _.mapValuesDeep(v, iteratee)] : [k, _.iteratee(iteratee)(v)]))
    );
  }
};
