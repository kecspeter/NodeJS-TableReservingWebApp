const express = require('express');

const path = require('path');
const app = express();
const bodyParser = require('body-parser');

//Parse post parameters
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = [];
    return next();
});


require('./routes/routes')(app)


app.use(express.static('public'))
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('Running on :3000');

});