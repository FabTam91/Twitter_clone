/**
 * session alapján ellenőrzi, hogy a felhasználó be van-e lépve, ha nincs átírányítja a főoldalra, különben nextet hív
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    return(req,res,next)=>{
        if (typeof req.session.username === 'undefined'){
            return res.redirect('/');
        }
        return next();
    }
}