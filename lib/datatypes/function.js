var evaluator = require('../evaluator');

function GalaxyFunction (file_scope, arguments, body) {
  this.file_scope = file_scope;
  this.arguments = arguments;
  this.body = body;
}
GalaxyFunction.prototype.call = function(args) {
  var scope = {};
  Object.setPrototypeOf(scope, this.file_scope);
  evaluator.evalStatements(scope, this.body);
}

module.exports = GalaxyFunction;
