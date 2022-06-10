/**
 * Add team data in the database
 */
 var requireOption = require('../common').requireOption;

 module.exports = function(objectrepository) {
    const csapatModel = requireOption(objectrepository, 'csapatModel');
    return function(req, res, next) {

        //Add csapat
        if ((typeof req.body.name === 'undefined') ||
            (typeof req.body.size === 'undefined') ||
            (typeof req.body.maxlvl === 'undefined')) {
            return next();
        }

        if ((req.body.name === "") ||
            (req.body.size === "") ||
            (req.body.maxlvl === "")) {
            console.log("New Csapat: Empty values are not allowed -> No DB update...")
            return next();
        }
        var newcsapat = new csapatModel(); 

        newcsapat.name = req.body.name;
        newcsapat.size = req.body.size;
        newcsapat.maxlvl = req.body.maxlvl;

        newcsapat.save(function (err, result) {
            if (err) {
              return next(err);
            }
      
        });
        res.redirect('/csapatok');
    }
};