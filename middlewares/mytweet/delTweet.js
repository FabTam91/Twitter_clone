/**
 * tweet törlése (res.locals.tweet-t használva)
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {tweetModel, saveDB} = objRepo;
    return (req, res, next) => {
        tweetModel.remove(res.locals.tweet);

        return saveDB(err => {
            if (err) {
                return next(err);
            }
            return res.redirect(`/mytweets`);
        });    
    }
}
