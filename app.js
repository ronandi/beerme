
/**
 * Module dependencies.
 */

var express = require('express')
, routes = require('./routes')
, user = require('./routes/user')
, http = require('http')
, path = require('path')
, Mongolian = require('mongolian');

var DB_HOST = 'localhost';
var server = new Mongolian({
    log: {
        debug: function(message) {},
        info: function(message) {},
        warn: function(message) {
            console.log(message);
        },
        error: function(message) {
            console.log(message);
        }
    }
});
var db = server.db('beerme-db');
var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/users', user.createUser);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
