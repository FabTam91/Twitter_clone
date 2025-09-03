/**
 * tweetek listájának kinyerése
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {tweetModel, userModel} = objRepo;
    return (req, res, next) => {
        let tweets = tweetModel.find({});

        tweets = tweets.map(tweet => {
            const user = userModel.findOne({ username: tweet.username });
            return {
                ...tweet,
                profileimg: user.profileimg ? user.profileimg : 'placeholder.jpg'
            };
        });

        res.locals.tweets = tweets;

        return next();
    }
}