var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Idopont = db.model('Idopont', {
  reservedDate: Date,
  startTime: Date,
  endTime: Date,
  tablenum: Number,
  teamid : {
    type: Schema.Types.ObjectId,
    ref: 'Csapat'
  }
});

module.exports = Idopont;