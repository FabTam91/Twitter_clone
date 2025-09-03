/**
 * res.locals.user-en módosítja a jelszót és elmenti
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo, whichField){
    const {saveDB, uuid} = objRepo;

    return (req, res, next) => {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }

        if (!req.body.password || req.body.password.trim() === '') {
            res.locals.errors = res.locals.errors || [];
            res.locals.errors.push("Password can't be empty.");
            return next();
        }

        res.locals.user.password = req.body.password;

        //prevent using the same reset link twice
        res.locals.user.secret = uuid.v4()

        res.locals.pwModSuccess = true;
        return saveDB(next);
    }
}