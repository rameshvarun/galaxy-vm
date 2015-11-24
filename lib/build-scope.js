var assert = require('assert');
var datatypes = require('./datatypes');

module.exports = function (global_scope, program) {
  var file_scope = {};
  Object.setPrototypeOf(file_scope, global_scope);

  program.declarations.forEach(function(decl) {
    switch (decl.type) {
      case 'FunctionDefinition':
        assert.equal(decl.declaration.type, 'FunctionDeclaration');
        var func = new datatypes.GalaxyFunction(file_scope, decl.declaration.arguments, decl.body);

        if (decl.declaration.isStatic) file_scope[decl.declaration.id.name] = func;
        else global_scope[decl.declaration.id.name] = func;

        break;
      default:
        throw new Error('Unkown declaration type: ' + decl.type);
    }
  });
}
