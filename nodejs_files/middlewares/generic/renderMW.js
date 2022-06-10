/**
 * Render the given page (with EJS)
 */

module.exports = function(objectrepository, viewName, title="") {
     return function(req, res, next) {
         objectrepository.pageTitle = title;
         res.render(viewName, objectrepository);
         return next();
     };
 };
 