const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const {initDB} = require('./services/db');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/uploads', express.static('uploads'));

app.use(session({
  secret: 'qwee12498523foiknyxrdsf13',
  resave: false,
  saveUninitialized: true
}));

app.set('view engine', 'ejs');

initDB((err, {tweetModel, userModel, saveDB})=>{
  if (err){
    return console.log("App cannot start", err);
  }

  require('./router')(app, {tweetModel, userModel, saveDB});
  app.listen(3000, () => {
    console.log(`Hello :3000`)
  });
});
