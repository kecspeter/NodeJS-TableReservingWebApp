/**
 * Delete a team from the database then redirects to /csapatok
 */
 var requireOption = require('../common').requireOption;

 module.exports = function(objectrepository) {
    const csapatModel = requireOption(objectrepository, 'csapatModel');
    return function(req, res, next) {
        // delete a team from the database
        
        objectrepository.foundCsapat.remove(function (err) {
            if (err) {
              return next(err);
            }
        return next();
        });



    };
}