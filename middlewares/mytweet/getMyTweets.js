/**
 * adott belépett felhasználóhoz tartozó tweetek kinyerése
 * a tweetek elhelyezése a res.locals.mytweets-en
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {tweetModel, userModel} = objRepo;
    return (req, res, next) => {
        let mytweets = tweetModel.find({
            username: req.session.username
        })

        mytweets = mytweets.map(tweet => {
            const user = userModel.findOne({ username: tweet.username });
            return {
                ...tweet,
                profileimg: user.profileimg ? user.profileimg : 'placeholder.jpg'
            };
        });

        res.locals.mytweets = mytweets;
        return next();
    }
}