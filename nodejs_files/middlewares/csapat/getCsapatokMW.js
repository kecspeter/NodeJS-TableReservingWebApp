/**
 * Get all team s data from the database
 */
var requireOption = require('../common').requireOption;

 module.exports = function(objectrepository) {
    const csapatModel = requireOption(objectrepository, 'csapatModel');
    return function(req, res, next) {
        // get data from database 
        csapatModel.find({}, (err, csapatok)=>{
            if(err){
                return next(err);
            }

            res.locals.csapatok = csapatok;
            return next();
        });
    };
};