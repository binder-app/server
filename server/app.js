
/* App
 * Server API 
 */

var express = require('express');
var bearer  = require('./bearer');

// Application
var app = express();
module.exports = app;

// Middleware
app.use(bearer());

// Routes
app.get('/api/matches', require('./routes/matches').get);
app.get('/api/suggestions', require('./routes/suggestions').get);
app.put('/api/profiles/:id', require('./routes/profiles').put);
app.post('/api/likes', require('./routes/likes').post);
app.post('/api/dislikes', require('./routes/dislikes').post);
