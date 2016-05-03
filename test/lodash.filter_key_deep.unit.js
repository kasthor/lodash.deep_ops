(function(){
  var object;

  module("Lodash filterKey", {
    setup: function(){
      object = {
        find: "me",
        level_1: {
          find: "me",
          level_2: {
            find: "me"
          }
        }
      }
    }
  })

  test("implements the forInDeep function", function(){
    ok( typeof _.filterKeyDeep == 'function' );
  })

  test("iterates only thru filtered keys", function(){
    var keys = [];

    _.filterKeyDeep( object, "find", function( value, key, path ){ keys.push( path ); })

    ok( _.every(keys, function( value ){ return value.match(/find$/) } ) );
    ok( _.size(keys) == 3 );
  })

  test("iterates fine on arrays", function(){
    object = {
      array: [{
        find: "me"
      },{
        child: "me"
      }]
    }
    var keys = [];

    _.filterKeyDeep( object, "find", function( value, key, path ){ keys.push( path ); })

    ok( _.isEqual([ "array[0].find" ], keys) );
  })

  test("calls the iteration function only if it matches key", function(){
    var keys = [];

    _.filterKeyDeep( object, "find", function( value, key ){ keys.push( key ); })

    ok( _.isEqual([ "find", "find", "find" ], keys) );
  })

  test("calls the iterator with the right path", function(){
    var keys = [];

    _.filterKeyDeep( object, "find", function( value, key, path ){ keys.push( path ); })

    ok( _.isEqual([ "find", "level_1.find", "level_1.level_2.find" ], keys) );
  })

  test("calls the iterator with the right object", function(){
    object = {
      array: [{
        find: "me"
      },{
        child: "me"
      }]
    }
    var resp;

    _.filterKeyDeep( object, "find", function( value, key, path, object ){ resp = object; })

    ok( object.array[0] == resp );
  })

}).call(this);
