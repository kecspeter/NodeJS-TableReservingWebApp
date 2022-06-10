/**
 * Delete an apointment data from the database then redirects to /idopontok
 */
 var requireOption = require('../common').requireOption;

 module.exports = function(objectrepository) {
    const idopontModel = requireOption(objectrepository, 'idopontModel');
    return function(req, res, next) {
        
        idopontModel.findOne({
            _id: req.params.idopontid
          }).exec(function (err, result) {
            if ((err) || (!result)) {
              console.log(err);
            }

            result.remove(function (err) {
                if (err) {
                  return next(err);
                }
            });
            return res.redirect('/idopontok');
        });
        
    };
};