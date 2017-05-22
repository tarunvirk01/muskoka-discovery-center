/**
 * Created by Manoj on 04-Apr-17.
 */
var express = require('express');
var router = express.Router();


var Price = require('../models/price');
var passport=require('passport');
function checking(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');

}


router.get('/', checking, function(req, res, next) {
    Price.find(function(err, price) {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }


        res.render('price/index', {
            price:price,
            title:"Payment",
            user: req.user
        });
    });
});


// adding the data to the table
router.get('/add', checking, function(req, res, next) {
    res.render('price/add',{
        title:"Add new payment",
        user:req.user

    });
});


router.post('/add', checking, function (req,res,next) {

    Price.create({
        cname: req.body.cname,
        details: req.body.details,
        price: req.body.price


    },function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/price');
    });
});

//to delete  the data from the table
router.get('/delete/:_id', checking, function(req, res, next) {

    Price.remove({ _id: req.params._id }, function(err) {
        if (err) {
            res.render('error');
            return;
        }

        res.redirect('/price');
    });
});

router.get('/:_id', checking, function(req, res, next) {

    Price.findById(req.params._id, function(err, price) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.render('price/edit', {
            price: price,
            title:"Edit price",
            user:req.user
        });
    });
});

router.post('/:_id', checking, function (req,res,next)
{
    var price = new Price({
        _id:req.params._id,
        cname: req.body.cname,
        details: req.body.details,
        price: req.body.price


    });
    Price.update({ _id: req.params._id }, price, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/price');
    });

});

module.exports=router;
