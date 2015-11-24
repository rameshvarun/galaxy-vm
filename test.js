var assert = require('chai').assert;
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

var tests_dir = path.join(__dirname, 'tests');
var interpreter = path.join(__dirname, 'bin', 'galaxy');

describe('Galaxy Interpreted', function() {
  var tests = fs.readdirSync(tests_dir);
  tests.forEach(function(test_name) {
    var test_dir = path.join(tests_dir, test_name);
    var test_file = path.join(test_dir, test_name + '.galaxy');
    var expected_file = path.join(test_dir, test_name + '.out');
    var expected = fs.readFileSync(expected_file, 'utf-8');

    it(test_name, function() {
      var result = child_process.spawnSync(process.argv[0], [interpreter, test_file], {
        encoding: 'utf-8'
      });
      if (result.status != 0) {
        throw result.stderr;
      } else {
        assert.equal(result.stdout, expected)
      }
    });

  });
});
