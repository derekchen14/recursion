// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  switch(typeof obj) {
    case "string":
      return '"'+obj+'"'; break;
    case "boolean":
      return obj ? 'true' : 'false'
    case "number":
      return ''+obj; break;
    case "function":
      throw new Error('Unstringifiable!'); break;
    case "object":
      try {
        if (obj === null) {
          return 'null';
        } else if (obj.length > -1) {
          return resolveArrays(obj);
        } else {
          return resolveDictionaries(obj);
        }
      } catch(err) {
        console.log(err.message);
        return '{}';
      }
      break;
  };
};

var resolveArrays = function(obj) {
  if (obj.length === 0) {
    return '[]';
  } else {
    var result = obj.reduce(function(memo, thing){

      return memo+stringifyJSON(thing)+',';
    }, '[');
    return result.slice(0,-1)+']';
  }
};

var resolveDictionaries = function(obj) {
  var k = Object.keys(obj);
  if (k.length === 0) {
    return '{}';
  } else {
    var result = k.reduce(function(j, thing){
      return j+stringifyJSON(thing)+':'+stringifyJSON(obj[thing])+',';
    }, '{');
    return result.slice(0,-1)+'}';
  }
};