const loki = require('lokijs');
let db = false;

/**
 * Tweet
 * - id
 * - username
 * - author
 * - images
 * - isretweet
 * - time
 * 
 * User
 * - username
 * - email
 * - password
 * - secret: in case of forgotten pass
 * - followedUsers
 * - profileimg
 * 
 */

/**
 * Init database
 * @param {*} cb 
 */

function initDB(cb){
    console.log("Init database")

    db = new loki('database.db');

    db.loadDatabase({}, err => {
        //...error handling
        if (err) {
            return cb(err);
        }

        let tweetModel = db.getCollection("tweet");
        if (tweetModel === null){
            tweetModel = db.addCollection("tweet", ["id", "username"]);
        }

        let userModel = db.getCollection("user");
        if (userModel === null){
            userModel = db.addCollection("user", {
                indices: ["username", "email"],
                unique: ["username", "email"]
            });
        }

        db.saveDatabase(err => {
            if (err){
                return cb(err);
            }
            console.log("DB saved after init");
            // dump all rows from all collections
            console.table(userModel.find());
            console.table(tweetModel.find());
            return cb(undefined, {tweetModel, userModel, saveDB: (cb)=>{
                console.log('Saving DB...');
                db.saveDatabase(cb);
            }});
        });
    });
}

module.exports.initDB = initDB;