/**
 * Created by Tarun on 17-Apr-17.
 */
var express = require('express');
var router = express.Router();



var Clients = require('../models/myclient');
var Camper = require('../models/camper');
var passport=require('passport');


router.get('/login', function(req, res, next) {
        res.render('camper/login', {
            title:"Login Camper",
            user:req.user
        });
});


router.post('/login', function (req,res,next) {
    Camper.create({
        process: req.body.process,
        camper: req.body.camper,
        code: req.body.code
    },function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('../');
    });
});

// adding the data to the table
router.get('/camperout', function(req, res, next) {
    res.render('camper/camperout',{
        title:"Camper Sign Out",
        user:req.user
    });
});
router.post('/camperout', function (req,res,next) {

    Camper.create({
        process: req.body.process,
        camper: req.body.camper,
        code: req.body.code
    },function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('../');
    });
});
module.exports=router;
