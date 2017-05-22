var express = require('express');
var router = express.Router();
var passport = require('passport');

var peoples=require('../models/subuser')



//addinng router get method to run the urls

router.get('/', function(req, res, next) {
  res.render('index',{
    title:"Muskoksa Discovery Centre",
      user:req.user
  });
});

router.get('/login', function(req, res, next) {
    var messages=req.session.messages || [];
    req.session.messages = [];
  res.render('login',{
    title:"Login",
      messages:messages,
      user:req.user
  });
});

router.get('/register', function(req, res, next) {
  res.render('register',{
    title:"register",
      user:req.user
  });
});

router.post('/register', function (req, res, next) {
   peoples.register(new peoples({ username: req.body.username }), req.body.password, function(err, people) {
        if (err) {
            console.log(err);
            res.redirect('error', { title: 'please register'});
        }
        res.redirect('/login');
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/myclients/landing',
    failureRedirect: '/login',
    failureMessage: 'Please Login again'
}));


router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

//facebook login
router.get('/facebook',
    passport.authenticate('facebook', {
        scope: 'email'
    }));


router.get('/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/login',
        scope: 'email'
    }),
    function(req, res) {

        res.redirect('/myclients');
    });

module.exports = router;
