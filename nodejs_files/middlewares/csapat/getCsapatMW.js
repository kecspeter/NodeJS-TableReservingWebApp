/**
 * Get data of the given team from the database
 */
var requireOption = require("../common").requireOption;

module.exports = function (objectrepository) {
  const csapatModel = requireOption(objectrepository, "csapatModel");
  return function (req, res, next) {
    // get data from database (query)
    csapatModel
      .findOne({
        _id: req.params.csapatid,
      })
      .exec(function (err, result) {
        if (err || !result) {
          console.log(err);
        }
        objectrepository.foundCsapat = result;
        return next();
      });
  };
};
