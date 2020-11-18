var express = require('express');
var User = require('../models/User');
var router = express.Router();

//get all

router.route('/').get(function (req, res) {
	
	User.find(function (err, doc) {
	    if (err) return next(err);
	    if(!doc) {
	    	res.json({Failed: true, message: 'No user exist!'})
	    }
	    else {
	    	res.json(doc);
	    }
	  });
});


	router.route('/:user_id').get(function (req, res) {
	    User.findById(req.params.user_id, function (err, user) {
	        if (err) res.send(err);
	        if(!user) {
	        	res.json({ Failed: true, message: 'No such user' });
	        } else {
	        	res.json(user);
	    	}
	    });
	});


router.route('/findbyname/:username').get(function (req, res) {
	
	User.findOne({ username: req.body.username }, function (err, doc) {
		if (err) throw err;
		res.json(doc);
    });
});



router.route('/:user_id').post(function (req, res) {
	
	User.findByIdAndUpdate(req.params.user_id, req.body, function (err, doc) {
	    if (err) return next(err);
	    if(!doc) 
	    	res.json({Failed: true, message: 'Such user doesnot exist!'})
	    else 
	    	res.json({Failed: false, data: req.body});
	  });
});



router.route('/deletebyname/:userid').get(function (req, res) {
	
	User.remove({ _id: req.params.userid }, function (err) {
        if (err) res.send(err);
        res.json({ Failed: false, message: 'Successfully deleted !' });
    });
});


module.exports = router;
