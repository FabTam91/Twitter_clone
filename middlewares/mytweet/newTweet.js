/**
 * új tweet létrehozása a bejelentkezett felhasználóhoz
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {tweetModel, uuid} = objRepo;
    return (req, res, next) => {
        if (typeof req.body.text === 'undefined') {
            return next();
        }

        res.locals.tweet = tweetModel.insert({
            id: uuid.v4(),
            username: req.session.username,
            author: req.session.username,
            images: [],
            isretweet: false,
        });

        return next();
    }
}