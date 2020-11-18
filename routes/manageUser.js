var express = require('express');
var router = express.Router();

// Models
var User = require('../models/User.js');

/***************Get All Users************/
router.get('/', function(req, res, next) {
  User.find(function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});


/********************Add new User***************************/
router.route('/newuser').post(function (req, res, next) {
    User.findOne({name: req.body.name}, function (err, doc) {
        if (err) throw err;
        if (doc) { // the name already exists
            res.json({ Existed: true, Build: false});
        } else {

            User.create(req.body, function(err, post) {
                if (err) return next(err);
                res.json({ Existed: false, Build: true});
            }) 

        }
    });
});


/***************Delete User*********************/
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({ Delete: true});
  });
});

/*****************************************/

module.exports = router;