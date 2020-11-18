var express = require('express');
var router = express.Router();

var User = require('../models/User.js');


router.route('/').post(function (req, res) {
	
	User.findOne({username: req.body.username}, function (err, doc) {
        if (err) throw err;
        if (doc) { // the name already exists
            res.json({ Failed: true, message: 'the name already exists'});
        } else {

            User.create(req.body, function(err, post) {
                if (err) return next(err);
                res.json({ Failed: false, message: 'User Created !'});
            }) 

        }
    });
});

module.exports = router;