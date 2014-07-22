var express  = require('express');

var app = express();

app.get('/', function (req, res) {
	var body = '<html>'+
    '<head>'+
    '<meta charset="utf-8">'+
    '</head>'+
    '<body>'+
    '<form id="main" name="niceform" action="">'+
    '<input type="text" id="forurl" placeholder="VSTAVLYAI URL SUDA" name="mess" style="padding:6px">'+
    '<input type="button" value="KNOPKA" id="but" style="padding:4px">'+
    '</form>'+
    '<ol class="spisok">'+
    '</ol>'+
    '<script type="text/javascript" src="jquery.js"></script>'+
    '<script src="bitly.js"></script>'+
    '</body>'+
    '</html>';
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write(body);
    res.end();
});


app.use(express.static(__dirname + '/public'));

app.get('/test', function(req, res) {
  res.sendfile(__dirname + '/public/App.html');
});



app.get('/about', function(req, res) {
	res.end('1337.v1.2ez');
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