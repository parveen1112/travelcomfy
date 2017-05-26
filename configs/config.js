var path = require('path'),
    pkgJSON = require('../package.json');

module.exports = {
    "logs": {
        name: 'verbose-file',
        level: 'info',
        json: false,
        dirname: path.join(LZ, 'logs'),
        filename: pkgJSON.name + '.log'
    },
    // Please specify the View Engine. ejs, dust, html etc
    viewEngine : 'ejs'
}