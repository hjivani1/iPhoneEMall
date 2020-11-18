var express = require('express');
var router = express.Router();

// Models
var Product = require('../models/Product.js');

/***************Get All Products************/
router.get('/', function(req, res, next) {
  Product.find(function (err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
});

/********create new Product*********************/
router.route('/newproduct').post(function (req, res, next) {
    Product.findOne({productName: req.body.productName}, function (err, doc) {
        if (err) throw err;
        if (doc) { // the product name already exists
            res.json({ Existed: true, Build: false});
        } else {

            Product.create(req.body, function(err, post) {
                if (err) return next(err);
                res.json({ Existed: false, Build: true});
            }) 

        }
    });
});

/*****get one product********************/
router.route('/:product_id').get(function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err) res.send(err);
        res.json(product);
    });
});


/************update existed product****************/
router.post('/update/:id', function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json({message: 'Update Successfully!'});
  });
});


/*************delete existed product********************/
router.delete('/:productID', function (req, res) {
    Product.remove({ _id: req.params.productID }, function (err) {
        if (err) res.send(err);
        res.json({ Delete: true });
    });
});

/****minus product account since product being bought*/
router.post('/editinventory', function(req, res, next) {
    Product.findOne({ _id:req.body.product_ID}, function(error, doc){
        if(doc){
            doc.volume += req.body.quantity;
            doc.inventory_amount -= req.body.quantity;
            // Product.update({ _id:req.body.product_ID},
            //     {$set : { volume : doc.volume + req.body.quantity}},
                // {$set : { inventory_amount : doc.inventory_amount - req.body.quantity}},
                
            doc.save(function(error){
                res.json({ Failed: false, message: 'Quantity updated' });
            })
            // );
        }else{
            res.json({ Failed: true, message: 'product not found' });   
        }
        
    })
});



module.exports = router;