/**
 * formból érkező új tweet adatok és képfeltöltés kezelése (res.locals.tweet-t használva), átirányít a my tweets oldalra
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {saveDB} = objRepo;
    return (req, res, next) => {
        if (typeof req.body.text === 'undefined'){
            return next();
        }

        res.locals.tweet.text = req.body.text;
        res.locals.tweet.images = [...res.locals.tweet.images, ...req.files.map(e=>e.filename)];

        return saveDB(err=>{
            if (err) {
                return next(err);
            }
            return res.redirect('/mytweets');
        });
    }
}