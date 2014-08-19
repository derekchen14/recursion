// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var nodes = [];
  cycle(document.body, nodes, className);
  return nodes;
};

var cycle = function (parent, nodes, className) {
  if (parent.hasChildNodes()) {
    var children = parent.childNodes;
    var targets = Array.prototype.filter.call(children, function(child){
      return (child.nodeType === 1) && (child.id === "")
    });
    for (var i=targets.length-1; i>=0; i--) {
      cycle(targets[i], nodes, className);
    }
  }
  var classes = parent.classList;
  for (var j=0; j<classes.length; j++) {
    if (classes[j] === className) {
      nodes.unshift(parent);
    }
  }
};