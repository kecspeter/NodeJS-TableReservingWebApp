/**
 * Add or Update team data in the database
 */
 var requireOption = require('../common').requireOption;

 module.exports = function(objectrepository) {
    const csapatModel = requireOption(objectrepository, 'csapatModel');
    return function(req, res, next) {
        //Edit csapat
        if(typeof req.params.csapatid === 'undefined' && 
        (typeof req.body.name === 'undefined') ||
        (typeof req.body.size === 'undefined') ||
        (typeof req.body.maxlvl === 'undefined')) {
            return next();
        }

        csapatModel.findOne({
            _id: req.params.csapatid
            }).exec(function (err, result) {
            
            if ((err) || (!result)) {
                console.log(err);
            };
            result.size = req.body.size;
            result.maxlvl = req.body.maxlvl;
            result.name = req.body.name;
            result.save(function (err, result) {
                if (err) {
                    return next(err);
                }
            });

        });
        return res.redirect('/csapatok');
    }
};