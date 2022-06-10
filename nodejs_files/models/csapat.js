var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Csapat = db.model('Csapat', {
  name: String,
  size: Number,
  maxlvl: Number,
});

module.exports = Csapat;