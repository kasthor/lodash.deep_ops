if( (typeof process !== 'undefined') && (process.release.name === 'node') ) var _ = require('lodash');

_.mixin({
  forInDeep: function( object, path, iteratee ){
    if( _.isUndefined( iteratee ) ){
      iteratee = path;
      path = "";
    }

    _.forIn( object, function( value, key ){
      var child_path = _.without( [ path, key ], "" );

      if( _.isArray( object ) ){
        var _idx = child_path.pop()
        child_path = child_path.join( '.' ) + "[" + _idx + "]";
      } else {
        child_path = child_path.join('.');
      }

      iteratee( value, key, child_path, object );

      if( _.isObject( value ) ){
        _.forInDeep( value, child_path, iteratee );
      }
    });
  },
  filterKeyDeep: function( object, key, iteratee ){
    _.forInDeep( object, function( v, k, p, o ){
      if( key == k ) iteratee( v, k, p, o );
    })
  }
})
