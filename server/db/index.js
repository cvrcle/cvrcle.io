var mongoose = require('mongoose');
//this is here for testing
var mongoUri = 'mongodb://hrla13user:DictionaryAttack123!!@ds125060.mlab.com:25060/pokemon';

mongoose.createConnection(mongoUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Yo bro, you\'re good to go!');
});

module.exports = db;
