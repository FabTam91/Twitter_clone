/**
 * DB-ből kinyerem azt a usert, akinek a username-je a paraméterben megjelenik, 
 * ill. a secret megegyezik az url paraméterben lévő secrettel, 
 * ha nem jó vmelyik parameter, átirányítom a főoldalra -> res.locals.user
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {userModel} = objRepo;
    return (req, res, next) => {
        const user = userModel.findOne({
            username: req.params.username,
            secret: req.params.secret
        })

        if (!user){
            return res.redirect('/');
        }

        res.locals.user = user;
        return next();
    }
}