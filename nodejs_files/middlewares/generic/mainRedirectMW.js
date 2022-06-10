/**
 * Redirects to the default page: /csapatok
 */

 module.exports = function(objectrepository) {
    return function(req, res, next) {
        res.redirect('/csapatok');
        return next();
    };
};