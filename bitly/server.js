var express  = require('express');
var mongoCol = require('./mongoCol');
var LolModel = require('./mongoCol').LolModel;
var LoginModel = require('./mongoCol').LoginModel;
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/Bitly/bitly.html');

});

app.get('/todo', function(req, res) {
  res.sendfile(__dirname + '/public/Todo/App.html');
});

app.get('/form', function(req, res) {
  res.sendfile(__dirname + '/public/Backbone/index.html');
});

app.get('/about', function(req, res) {
	res.end('1337.v1.2ez');
});

app.get('/test', function(req, res){

  var long = req.query.longUrl;
  var short = req.query.shortUrl;
  console.log('plusDB');

  var plusDB = new LolModel({
    longUrl: long,
    shortUrl: short
  });

  plusDB.save(function(err, entry) {
    if (err) return console.error(err);
  });
});
app.get ('/login', function(req, res) {
    var uname = req.query.username;
    var pass = req.query.password;
    console.log('plusLog');

  var plusLog = new LoginModel({
    username: uname,
    password: pass
  });

  plusLog.save(function(err, entry) {
    if (err) return console.error(err);
    else {
	res.redirect('/');
    }
  });
});

app.use(function(req, res, next){
    res.status(404);
    console.log('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});
app.use(function(err, req, res, next){
    res.status(err.status || 500);
    console.log('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});

app.listen(1337, function(){
   console.log('VSE OK!! ZARYAJAEM NA LOCALHOSTE:1337! ENJOY!!');
});