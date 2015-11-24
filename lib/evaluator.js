var datatypes = require('./datatypes');

var evalStatements = module.exports.evalStatements = function(scope, statements) {
  statements.forEach(function(statement) {
    evalStatement(scope, statement);
  });
}

var evalStatement = module.exports.evalStatement = function(scope, statement) {
  switch (statement.type) {
    case 'ExpressionStatement':
      evalExpression(scope, statement.expression);
      break;
    default:
      throw new Error('Unkown statement type: ' + statement.type);
  }
}

var evalExpression = module.exports.evalExpression = function(scope, expression) {
  switch (expression.type) {
    case 'FunctionCall':
      var func = scope[expression.callee.name];
      var args = expression.arguments.map(function(arg) {
        return evalExpression(scope, arg);
      });

      if (func) {
        if (func instanceof Function) {
          return func.apply(null, args);
        } else if(func instanceof datatypes.GalaxyFunction) {
          return func.call(args);
        } else {
          throw new Error("Don't know how to execute " + func.toString());
        }
      } else {
        throw new Error('Could not find function named ' + expression.callee.name);
      }
      break;
    case 'StringLiteral':
      return new datatypes.GalaxyString(expression.value);
      break;
    default:
      throw new Error('Unkown expression type: ' + expression.type);
  }
}
