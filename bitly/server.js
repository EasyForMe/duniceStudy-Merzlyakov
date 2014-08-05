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

app.get('/profile', function(req, res) {
  res.sendfile(__dirname + '/public/Backbone/profile.html');
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
app.delete('/login', function(req, res) {
  console.log(req.url);
});
/*
app.post('/login', function(req, res) {
    var uname = req.query.username;
    var pass = req.query.password;
    console.log(req.model);

  var plusLog = new LoginModel({
    username: uname,
    password: pass
  });

  plusLog.save(function (err) {
    if (!err) {
      console.log('good');
      res.redirect("/form");
    }
  });
  });
*/
app.post('/login', function(req, res, next) {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Method', 'POST, GET, PUT, DELETE, OPTIONS' );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-File-Name, Content-Type, Cache-Control' );
  
  if( 'OPTIONS' == req.method ) {
    res.send( 203, 'OK' );
  }
  
  // Create a new message model, fill it up and save it to Mongodb
  var message = new LoginModel(); 
  
  console.log(req.query);

  message.message = req.params.message;
  message.date = new Date() 
  message.save(function () {
    res.send(req.body);
  });
});

resCol = function(req, res, next) {
  LoginModel.find().limit(20).sort({'username': -1}).exec(function (arr,data) {
    res.send(data);
});
};

app.get('/log', resCol);
app.post('/log', function(req, res) {
  console.log('post log');
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