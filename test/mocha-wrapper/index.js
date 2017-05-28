var bootstrap = require('../../configs/bootstrap'),
    path = require("path");
global.expect = require('chai').expect;
global.assert = require('chai').assert;
global.LZ = process.cwd();

bootstrap(path.join(LZ, 'test', 'fixtures'));