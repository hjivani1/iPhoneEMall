var express = require('express');
var router = express.Router();

// Models
var Cart = require('../models/Cart.js');


/* GET */
router.get('/', function(req, res, next) {
  Cart.find(function(err,carts){
		if (err) res.send(err);
			res.json(carts);
	})
})


/* GET by user */
router.get('/findbyuser/:userid', function(req, res, next) {
  Cart.find({"uId": req.params.userid} ,function(error,carts){
		if(carts){
			res.json(carts);
		}else{
			res.json({ Failed: true, message: 'Your Shopping Cart Is Empty.' });
		}
	})
})


/* POST */
router.post('/addtocart', function(req, res, next) {
	Cart.findOne({"uId":req.body.uId, "cId":req.body.cId},function(error,doc){
		if(doc){
			Cart.update({"uId":req.body.uId, "cId":req.body.cId},{$set : { cQuantity : doc.cQuantity + req.body.cQuantity}},function(error,doc){
				res.json({ Failed: false, message: 'Quantity updated' });
		});
	}else{
			Cart.create({
				uId: req.body.uId,
				// uType:req.body.uType,
				cId: req.body.cId,
				// cstore_ID: req.body.cstore_ID,
				cName: req.body.cName,
				cQuantity :req.body.cQuantity,
				cPrice: req.body.cPrice,
				cImgSrc: req.body.cImgSrc,
			},function(error,doc){
				res.json({ Failed: false, message: 'successfully added' });
			});
	}
		
	})
});

/* PUT /carts/:id */
// router.post('/updatecart/:id', function(req, res, next) {
//   Cart.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

router.get('/:product_ID', function(req, res, next) {
  Cart.find({ product_ID: req.params.product_ID }, function (err, doc) {
    if (err) return next(err);
    if (JSON.stringify(doc)=='[]') {
      res.json({ Exist: false, data:doc});
    } else {
      res.json({ Exist: true, data:doc});
    }
  });
});

//delete item by id
router.delete('/:_id', function (req, res) {
	Cart.deleteOne({ _id: req.params._id }, function (err, users) {
        if (err) res.send(err);
        res.json({ Failed: false, message: 'Successfully deleted!' });
    })
});

// Return router
module.exports = router;