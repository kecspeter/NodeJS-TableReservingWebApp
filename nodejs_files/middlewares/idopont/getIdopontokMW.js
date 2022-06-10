/**
 * Get an apointment data from the database
 */
 var requireOption = require('../common').requireOption;

 module.exports = function(objectrepository) {
    const idopontModel = requireOption(objectrepository, 'idopontModel');
    return function(req, res, next) {
        // get data from database
        idopontModel.find({}, (err, idopontok)=>{
            if(err){
                return next(err);
            }
            res.locals.idopontok = idopontok;
            //console.log(res.locals.idopontok)
            return next();    
        });
        
        
    }
 };