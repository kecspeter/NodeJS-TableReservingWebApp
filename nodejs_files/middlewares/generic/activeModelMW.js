/**
 * Change the value of csapatok
 * It is used to change the selected model on the website 
 * currentModell parameter: 1 = Csapatok, 0 = Idopontok  
 */

 module.exports = function(objectrepository, currentModel) {
    return function(req, res, next) {
        if (currentModel == 1) {
            objectrepository.csapat = true;
        }
        else
        {
            objectrepository.csapat = false;
        }
        return next();
    };
};