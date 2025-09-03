/**
 * követett felhasználók tweetjeinek kinyerése
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {tweetModel, userModel} = objRepo;
    return (req, res, next) => {
        let tweets = tweetModel.where(tweet => res.locals.user.followedUsers.includes(tweet.username));

        tweets = tweets.map(tweet => {
            const user = userModel.findOne({ username: tweet.username });
            return {
                ...tweet,
                profileimg: user.profileimg ? user.profileimg : 'placeholder.jpg'
            };
        });

        tweets.sort((a, b) => b.meta.created - a.meta.created);

        console.log(tweets)

        res.locals.tweets = tweets;
        return next();
    }
}