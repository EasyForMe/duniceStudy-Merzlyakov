var mongoose    = require('mongoose');
mongoose.connect('mongodb://localhost/test1');
var db = mongoose.connection;

db.once('open', function callback () {
    console.log("Connected to DB!");
});

var Schema = mongoose.Schema;

var Lol = new Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true }
});

var LolModel = mongoose.model('Lol', Lol);

exports.LolModel = LolModel;