
/* r
 * Rethink database cursor
 */

var r   = require('rethinkdbdash');
var url = require('url');

var opts = {};
if (process.env.DB) {
  var credentials = url.parse(process.env.DB);
  opts.db = credentials.pathname.substr(1);
  opts.host = credentials.hostname;
  opts.authKey = credentials.auth;
  opts.port = credentials.port;
} else {
  console.warn('Warning: No DB credentials specified');
  console.warn('Warning: Assuming default DB credentials');
}

module.exports = r(opts);
