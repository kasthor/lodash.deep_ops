(function(){
  var object;

  module("Lodash forIn", {
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
    ok( typeof _.forInDeep == 'function' );
  })

  test("iterates thru all the keys", function(){
    var keys = [];

    _.forInDeep( object, function( value, key ){ keys.push( key ); })

    ok( _.difference( [ "find", "level_1", "find", "level_2", "find" ], keys ) == 0 );
  })

  test("passes thru the paths of each element", function(){
    var keys = [];

    _.forInDeep( object, function( value, key, path ){ keys.push( path ); })

    ok( _.difference( [ "find", "level_1", "level_1.find", "level_1.level_2", "level_1.level_2.find" ], keys ) == 0 );
  })

}).call(this);
