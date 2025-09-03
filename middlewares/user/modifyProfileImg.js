/**
 * újonnan feltöltött képet cseréli a belépett user profiljában
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {saveDB} = objRepo;

    return (req, res, next) => {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }

        if(typeof req.file === 'undefined'){
            return next();
        }

        res.locals.user.profileimg = req.file.filename;

        return saveDB(next);
    }
}