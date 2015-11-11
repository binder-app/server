
/* Bearer
 * Middleware for bearer token parsing 
 */

module.exports = middleware;

var error = {
  error : 'Not authorized. Use a valid bearer token'
};

function parser(string) {
  string = string || '';
  var expected = 'Bearer ';
  var token = string.substr(expected.length);
  var prefix = string.substr(0, expected.length);
  return prefix == expected && !!token ? token : null;
}

function middleware() {
  return (req, res, next) => {
    var bearer = parser(req.get('Authorization'));
    if (!bearer) return res.status(401).send(error);
    req.user = bearer;
    next();
  };
}
