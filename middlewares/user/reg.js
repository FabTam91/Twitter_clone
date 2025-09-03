/**
 * ellenőrzi, hogy létezik-e ez a username és email cím a rendszerben. Ha az email cím létezik, 
 * az elfelejtett jelszó kérése screenre irányít. Ha a username létezik, vagy a privacy statement nincs elfogadva akkor hibaüzenetet dob. 
 * Ha minden rendben, beregisztrálja a felhasználót.
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {userModel, saveDB} = objRepo;
    return(req,res,next)=>{
        if (!req.body.email || req.body.email.trim() === '' ||
            !req.body.password || req.body.password.trim() === '' ||
            !req.body.username || req.body.username.trim() === ''
        ) {
            res.locals.errors = res.locals.errors || [];
            res.locals.errors.push('All fields are required.');
            return next();
        }

        if (typeof req.body.statement === 'undefined'){
            res.locals.errors = res.locals.errors || [];
            res.locals.errors.push('Privacy statement must be accepted for registration.');
            return next()
        }

        try {
            userModel.insert({
                username: req.body.username,
                email: req.body.email.trim().toLowerCase(),
                password: req.body.password,
                secret: false,
                followedUsers: []
            });

            saveDB();
            return res.redirect('/login');

        } catch (error) {

            const user = userModel.findOne({
                username: req.body.username,
            });

            if (user){
                res.locals.errors = res.locals.errors || [];
                res.locals.errors.push('Username already taken.');
                return next();
            }

            return res.redirect('/forgotpw');
        } 
    }
}