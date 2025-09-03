/**
 * beléptetés (session + db ellenőrzés)
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {userModel} = objRepo;
    return(req,res,next)=>{
        if (!req.body.email || req.body.email.trim() === '' ||
            !req.body.password || req.body.password.trim() === ''){
            return next()
        }

        const user = userModel.findOne({
            email: req.body.email.trim().toLowerCase(),
            password: req.body.password
        });

        if (!user){
            res.locals.errors = res.locals.errors || [];
            res.locals.errors.push('Incorrect email or password!');
            return next();
        }

        req.session.username = user.username;
        res.locals.user = user;

        return req.session.save(err=>{
            if (err){
                return next(err);
            }

            return next();
        });
    }
}