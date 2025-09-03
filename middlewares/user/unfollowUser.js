/**
 * a tweet szerzőjének követése (res.locals.user-t használva
 * @param {*} objRepo 
 * @returns 
 */

module.exports = function (objRepo){
    const {tweetModel, uuid, saveDB} = objRepo;
    return(req,res,next)=>{
        const tweet = tweetModel.findOne({
            id: req.params.tweetid,
        });

        if (!tweet){
            return res.redirect('/');
        }

        const index = res.locals.user.followedUsers.indexOf(tweet.username);
        if (index > -1) { 
            res.locals.user.followedUsers.splice(index, 1); 
        }

        return saveDB(err=>{
            if (err) {
                return next(err);
            }
            return res.redirect('/');
        });
    }
}