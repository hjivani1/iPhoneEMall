var express = require('express');
var router = express.Router();

var User = require('../models/User.js');

router.route('/').post(function (req, res) {
	

	User.findOne({ username: req.body.username }, function (err, doc) {
		if (err) throw err;
		if (!doc) {
          res.json({ Failed: true, message: 'Enter correct username' });
        } else {
            if (doc.password != req.body.password) {
                res.json({ Failed: true, message: 'username or password not valid ' });
            } else {
				res.json({ Failed: false, user: doc });
            }

        }
    });
});
module.exports = router;