/**
 * emailt küld az adott email címre egy linkkel, ami a jelszó módosításra screen-re vezet
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {userModel, uuid, saveDB, emailService} = objRepo;
    return (req, res, next) => {
        if (!req.body.email || req.body.email.trim() === '') {
            return next();
        }

        const user = userModel.findOne({
            email: req.body.email.trim().toLowerCase(),
        });

        if (!user){
            res.locals.errors = res.locals.errors || [];
            res.locals.errors.push('There is no registration with this email address.');
            return next();
        }

        user.secret = uuid.v4();
        userModel.update(user);

        //email küldés
        emailService.sendEmail(
            user.email, 
            'Forgotten password', 
            `Use this link: http://localhost:3000/newpw/${user.username}/${user.secret}`
        );

        res.locals.pwresetSuccess = true;

        return saveDB(next)
    }
}