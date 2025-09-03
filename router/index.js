const uuid = require('uuid');
const multer = require('multer');
const path = require('path');

const emailService = require('../services/email');

const authMW = require('../middlewares/user/auth');
const followUserMW = require('../middlewares/user/followUser');
const unfollowUserMW = require('../middlewares/user/unfollowUser');
const getLoggedInUserMW = require('../middlewares/user/getLoggedInUser');
const getUserByPwSecretMW = require('../middlewares/user/getUserByPwSecret');
const loginMW = require('../middlewares/user/login');
const logoutMW = require('../middlewares/user/logout');
const modifyUserPwMW = require('../middlewares/user/modifyUserPw');
const modifyProfileImgMW = require('../middlewares/user/modifyProfileImg');
const regMW = require('../middlewares/user/reg');
const sendForgotPwMW = require('../middlewares/user/sendForgotPw');

const getTweetsMW = require('../middlewares/tweet/getTweets');
const getFollowedTweetsMW = require('../middlewares/tweet/getFollowedTweets');

const delTweetMW = require('../middlewares/mytweet/delTweet');
const delPicMW = require('../middlewares/mytweet/delPic');
const getMyTweetMW = require('../middlewares/mytweet/getMyTweet');
const getMyTweetsMW = require('../middlewares/mytweet/getMyTweets');
const modTweetMW = require('../middlewares/mytweet/modTweet');
const newTweetMW = require('../middlewares/mytweet/newTweet');
const reTweetMW = require('../middlewares/mytweet/reTweet');

const renderMW = require('../middlewares/render');

const uploadMW = multer({storage: multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads');
    }, 
    filename: function (req, file, cb) {
        const rnd = Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase();
        return cb(null, `${file.fieldname}-${Date.now()}-${rnd}${ext}`);
    }
})});


module.exports = function (app, {tweetModel, userModel, saveDB}){
    const objRepo = {
        tweetModel,
        userModel,
        uuid,
        saveDB,
        emailService
    };

    //Request forgotten password link
    app.use('/forgotpw', getTweetsMW(objRepo), sendForgotPwMW(objRepo), renderMW(objRepo, 'forgotpw'));

    //Change password 
    app.get('/newpw/:username/:secret', getTweetsMW(objRepo), getUserByPwSecretMW(objRepo), renderMW(objRepo, 'newpw'));
    app.post('/newpw/:username/:secret', getTweetsMW(objRepo), getUserByPwSecretMW(objRepo), modifyUserPwMW(objRepo), renderMW(objRepo, 'newpw'));

    //Registration screen
    app.get('/reg', getTweetsMW(objRepo), renderMW(objRepo, 'reg'));
    app.post('/reg', getTweetsMW(objRepo), regMW(objRepo), renderMW(objRepo, 'reg'));

    //Logout
    app.get('/logout', logoutMW(objRepo));

    //My profile screen
    app.get('/myprofile', authMW(objRepo), getLoggedInUserMW(objRepo), renderMW(objRepo, 'myprofile'));
    app.post('/myprofile', authMW(objRepo), getLoggedInUserMW(objRepo), uploadMW.single('profile', 10), modifyUserPwMW(objRepo), modifyProfileImgMW(objRepo), renderMW(objRepo, 'myprofile'));

    //Create new tweet 
    app.use('/newtweet', authMW(objRepo), uploadMW.array('images', 10), newTweetMW(objRepo), modTweetMW(objRepo), renderMW(objRepo, 'newtweet'));

    //Edit Tweet
    app.use('/tweet/:tweetid/edit', authMW(objRepo), uploadMW.array('images', 10), getMyTweetMW(objRepo), modTweetMW(objRepo), renderMW(objRepo, 'edittweet'));

    //Delete picture (no screen)
    app.get('/tweet/:tweetid/delpic/:picname', authMW(objRepo), getMyTweetMW(objRepo), delPicMW(objRepo));

    //Delete tweet (no screen)
    app.get('/tweet/:tweetid/del', authMW(objRepo), getMyTweetMW(objRepo), delTweetMW(objRepo));

    //Retweet (no screen)
    app.get('/tweet/:tweetid/retweet', authMW(objRepo), reTweetMW(objRepo));

    //Follow user (no screen)
    app.get('/tweet/:tweetid/followuser', authMW(objRepo), getLoggedInUserMW(objRepo), followUserMW(objRepo));

    //Unfollow user (no screen)
    app.get('/tweet/:tweetid/unfollowuser', authMW(objRepo), getLoggedInUserMW(objRepo), unfollowUserMW(objRepo));

    //My tweets
    app.get('/mytweets', authMW(objRepo), getLoggedInUserMW(objRepo), getMyTweetsMW(objRepo), renderMW(objRepo, 'mytweets'));

    //Tweets from followed users
    app.get('/following', authMW(objRepo), getLoggedInUserMW(objRepo), getFollowedTweetsMW(objRepo), renderMW(objRepo, 'following'));

    //Main page + login
    app.use('/', getTweetsMW(objRepo), getLoggedInUserMW(objRepo), loginMW(objRepo), renderMW(objRepo, 'index'));

    return app
}



