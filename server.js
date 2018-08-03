var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var exphbs = require('express-handlebars');

// Import routes and give the server access to them.
var routes = require('./controllers/burgers_controller.js');

var port = process.env.PORT || 8080;
var app = express();
var methodOverride = require("method-override");

app.use(methodOverride("_method"));

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}));

// Set Handlebars.
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use('/', routes);

// Start our server so that it can begin listening to client requests.
app.listen(port, function () {
	  // Log (server-side) when our server has started
	console.log('Server is running on ' + port);
});