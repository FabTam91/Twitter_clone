/**
 * adott tweet létrehozása a bejelentkezett felhasználó neve alatt
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {tweetModel, uuid, saveDB} = objRepo;
    return(req,res,next)=>{
        const retweet = tweetModel.findOne({
            id: req.params.tweetid,
        });

        if (!retweet){
            return res.redirect('/');
        }

        res.locals.tweet = tweetModel.insert({
            id: uuid.v4(),
            username: req.session.username,
            author: retweet.author,
            images: retweet.images,
            text: retweet.text,
            isretweet: true,
        });

        return saveDB(err=>{
            if (err) {
                return next(err);
            }
            return res.redirect('/mytweets');
        });
    }
}