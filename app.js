var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport =require('passport');
var session= require('express-session');
var localStrategy = require('passport-local').Strategy;




var index = require('./routes/index');
var users = require('./routes/users');
var myclients = require ('./routes/clients');
var camper = require('./routes/camper');
var staff = require('./routes/staff');
var price = require('./routes/price');
var app = express();

// connection to the database

var mongoose= require('mongoose');
var config=require('./config/global');
mongoose.connect(config.db);

var db=mongoose.connection;
db.once('open',function(){
    console.log('connected');
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'string',
    resave:true,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

var peoples=require('./models/subuser');
passport.use(peoples.createStrategy());



var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'emails']
    },
    function(accessToken, refreshToken, profile, cb) {
        peoples.findOrCreate({
            facebookId: profile.id,
            username: profile.emails[0].value
        }, function (err, user) {
            return cb(err, user);
        });
    }
));




passport.serializeUser(peoples.serializeUser());
passport.deserializeUser(peoples.deserializeUser());
app.use('/', index);
app.use('/users', users);
app.use('/myclients', myclients);
app.use('/staff', staff);
app.use('/camper', camper);
app.use('/price', price);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error', user:req.user});
});

module.exports = app;
