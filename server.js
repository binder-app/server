
/* Server
 * Serve the API application
 */

var app = require('./server/app');

app.listen(process.env.PORT || 8080, () => {
  console.log('Application started');
});
