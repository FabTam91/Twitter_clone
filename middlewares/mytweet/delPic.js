/**
 * res.locals.tweet-ből egy adott kép törlése (url paraméterben a picname a kép fájlneve)
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {saveDB} = objRepo;
    return (req, res, next) => {
        res.locals.tweet.images = res.locals.tweet.images.filter(e=>e!==req.params.picname);
        return saveDB(err=>{
            if (err) {
                return next(err);
            }
            return res.redirect(`/tweet/${res.locals.tweet.id}/edit`);
        });
    }
}