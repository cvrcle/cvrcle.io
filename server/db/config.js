var mongoose = require('mongoose');

var assert = require('assert');
//this is here for testing

// line 7 OR line 8 might be redundant
// we will have to ask about this
var Promise = require("bluebird");
var options = { promiseLibrary: require('bluebird') };
var mongoUri = 'mongodb://hrla13user:DictionaryAttack123!!@ds125060.mlab.com:25060/pokemon';
var db = mongoose.createConnection(mongoUri, options);

// we might be using sequelize now :)

Promise.promisifyAll(require("mongoose"));
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Yo bro, you\'re good to go!');
});

// do the thing?

module.exports = db;
