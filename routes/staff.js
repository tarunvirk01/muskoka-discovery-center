/**
 * Created by Tarun
 */
var express = require('express');
var router = express.Router();

//require staff model

var Staff = require('../models/staff');
var passport=require('passport');
function checking(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');

}


router.get('/', checking, function(req, res, next) {
    Staff.find(function(err, staff) {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }
        res.render('staff/index', {
            staff:staff,
            title:"Staff List",
            user: req.user
        });
    });
});


// adding the data to the table
router.get('/add', checking, function(req, res, next) {
    res.render('staff/add',{
        title:"Add new staff members",
        user:req.user
    });
});


router.post('/add', checking, function (req,res,next) {

    Staff.create({
        staffname: req.body.staffname,
        stafflastname: req.body.stafflastname,
        phone: req.body.phone,
        role: req.body.role
    },function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/staff');
    });
});

//to delete  the data from the table
router.get('/delete/:_id', checking, function(req, res, next) {

    Staff.remove({ _id: req.params._id }, function(err) {
        if (err) {
            res.render('error');
            return;
        }

        res.redirect('/staff');
    });
});

router.get('/:_id', checking, function(req, res, next) {

    Staff.findById(req.params._id, function(err, staff) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.render('staff/edit', {
            staff: staff,
            title:"Edit Staff Info",
            user:req.user
        });
    });
});

router.post('/:_id', checking, function (req,res,next)
{
    var staff = new Staff({
        _id:req.params._id,
        staffname: req.body.staffname,
        stafflastname: req.body.stafflastname,
        phone: req.body.phone,
        role: req.body.role
    });
    Staff.update({ _id: req.params._id }, staff, function(err) {
        if (err) {
            console.log(err);
            res.render('error');
            return;
        }
        res.redirect('/staff');
    });

});

module.exports=router;
