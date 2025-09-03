/**
 * kinyeri a belépett felhasználó adatait DB-ből és a res.locals.user-re rakja
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {userModel} = objRepo;
    return (req, res, next) => {

        if (typeof req.session.username === 'undefined') {
            return next();
        }

        const user = userModel.findOne({
            username: req.session.username
        });

        if (!user){
            return next(new Error('User from session does not exist.'));
        }

        res.locals.user = user;
        
        return next();
    }
}