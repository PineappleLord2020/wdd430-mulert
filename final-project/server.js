// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

// import the routing file to handle the default (index) route
var index = require('./server/routes/app');
const locationRoutes = require('./server/routes/locations');
const authorRoutes = require('./server/routes/authors');
const booksRoutes = require('./server/routes/books');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ... */

var app = express(); // create an instance of express

// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

mongoose.connect('mongodb://localhost:27017/final-project', { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to database: ${mongoose.connection.name}!`);
})
  .catch(err => {
    console.log('Connection failed:', err);
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

app.use((req, res, next) => {
  console.log(`[server.js] Request received: ${req.method} ${req.url}`);
  next();
});

// Tell express to map the default route ('/') to the index route
app.use('/api/locations', locationRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', booksRoutes);

app.use((req, res, next) => {
  if (req.url.startsWith('/api/')) {
    console.log(`[server.js] WARNING: API request did not match an explicit API route: ${req.url}`);  
  } else {
    console.log(`[server.js] Request passed to next middleware (likely Angular catch-all): ${req.url}`);
  }
  next();
})
/*app.use('/', index);

app.use(function(req, res, next) {
    res.render("index");
});*/

// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...

// Tell express to map all other non-defined routes back to the index page

// Define the port address and tell express to use this port
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
