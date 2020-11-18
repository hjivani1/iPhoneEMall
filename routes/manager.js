var express = require('express');
var router = express.Router();

// Models
var Manager = require('../models/Manager.js');

/***manager log in*****/
router.route('/login').post(function (req, res) {
	Manager.findOne({ name: req.body.name }, function (err, doc) {
		if (err) throw err;
		if (!doc) {
          res.json({ Failed: true, message: 'username not found' });
        } else {
            if (doc.password != req.body.password) {
                res.json({ Failed: true, message: 'username and password do not match ' });
            } else {
				res.json({ Failed: false, Manager: doc });
            }

        }
    });
});

/****manager builds a new manager*****************/
router.route('/newrole').post(function (req, res, next) {
    Manager.findOne({name: req.body.name}, function (err, doc) {
        if (err) throw err;
        if (doc) { // the name already exists
            res.json({ Failed: true, message: 'the name already exists'});
        } else {

            Manager.create(req.body, function(err, post) {
                if (err) return next(err);
                res.json({ Failed: false, Build: true});
            }) 

        }
    });
});

/****************get all managers************************/
router.get('/', function(req, res, next) {
  Manager.find(function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});

/****************get one manager by id****************/
router.route('/:manager_id').get(function (req, res) {
    Manager.findById(req.params.manager_id, function (err, manager) {
        if (err) res.send(err);
        res.json(manager);
    });
});

/****************update manager info*********************/
router.post('/:id', function(req, res, next) {
  Manager.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
    if (err) return next(err);
    res.json({message: 'Information successfully updated'});
  });
});

module.exports = router;