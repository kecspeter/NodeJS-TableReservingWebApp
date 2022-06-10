/**
 * Set a changed or created an apointment data to the database
 */
 var requireOption = require('../common').requireOption;
 module.exports = function(objectrepository) {
    const idopontModel = requireOption(objectrepository, 'idopontModel');
    const csapatModel = requireOption(objectrepository, 'csapatModel');
    return function(req, res, next) {
        // set data into the DB (res.new_idopont)
        if ((typeof req.body.reservedate === 'undefined') ||
        (typeof req.body.starttime === 'undefined') ||
        (typeof req.body.endtime === 'undefined') ||
        (typeof req.body.tablenum === 'undefined') ||
        (typeof req.body.csapatname === 'undefined')) {
            return next();
        }

        if ((req.body.reservedate === "") ||
        (req.body.starttime === "") ||
        (req.body.endtime === "") ||
        (req.body.tablenum === "") ||
        (req.body.csapatname === "")) {
            console.log("New Idopont: Empty values are not allowed -> No DB update...");
            return next();
        }

        
        csapatModel.findOne({
            name: req.body.csapatname
            }).exec(function (err, result) {
            
            if ((err) || (!result)) {
                console.log(err);
            };

            var newidopont = new idopontModel(); 

            let startDate = req.body.reservedate;
            let starttimeString = startDate+"T"+req.body.starttime+":00";
            let endtimeString = startDate+"T"+req.body.endtime+":00";

            newidopont.reservedDate = new Date(startDate);
            newidopont.startTime = new Date(starttimeString);                      
            newidopont.endTime = new Date(endtimeString);
            
            newidopont.tablenum = req.body.tablenum;
            newidopont.teamid = result;

            
            newidopont.save(function (err, result) {
                if (err) {
                    return next(err);
                }
            });
            
        });
        res.redirect('/idopontok');
    };
};

        
