
/* Error
 * Exception middleware for handling route errors
 */

module.exports = middleware;

function middleware() {
  return (err, req, res, next) => {
    var message = { error : err.message };
    res.status(500).send(message); 
    console.error(err.stack);
  };
}
