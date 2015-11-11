
/* App
 * Server API 
 */

var express    = require('express');
var bodyParser = require('body-parser');
var bearer     = require('./bearer');
var error      = require('./error');

// Application
var app = express();
module.exports = app;

// Middleware
app.use(bearer());
app.use(bodyParser.json());

// Routes
app.get('/api/matches', require('./routes/matches').get);
app.get('/api/suggestions', require('./routes/suggestions').get);
app.put('/api/profiles/:id', require('./routes/profiles').put);
app.post('/api/likes', require('./routes/likes').post);
app.post('/api/dislikes', require('./routes/dislikes').post);

// Error handler
app.use(error());
