/**
 * adott felhasználóhoz tartozó tweet kinyerése (res.locals.tweet)
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {tweetModel} = objRepo;

    return (req, res, next) => {
        const tweet = tweetModel.findOne({
            id: req.params.tweetid,
            username: req.session.username
        });

        if (!tweet){
            return res.redirect('/mytweets');
        }

        res.locals.tweet = tweet;
        return next();
    }
}