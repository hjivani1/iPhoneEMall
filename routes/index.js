var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/managerLogIn', function(req, res, next) {
  res.render('manager/managerLogIn', { title: 'index' });
});

/* Manager home page*/
router.get('/managerHome', function(req, res, next) {
  res.render('manager/managerHome', { title: 'index' });
});

/* Set new manager*/
router.get('/newManager', function(req, res, next) {
  res.render('manager/addNewManager', { title: 'index' });
});

/*Get all managers*/
router.get('/getAllManager', function(req, res, next) {
  res.render('manager/getAllManager', { title: 'index' });
});

/*Manage users*/
router.get('/getAllUser', function(req, res, next) {
  res.render('manager/manageUser', { title: 'index' });
});

/*Update manager info*/
router.get('/updateManagerInfo', function(req, res, next) {
  res.render('manager/updateManagerInfo', { title: 'index' });
});

/*View products and delete*/
router.get('/viewProduct', function(req, res, next) {
  res.render('manager/viewProduct', { title: 'index' });
});

/*update product information*/
router.get('/updateProductInfo', function(req, res, next) {
  res.render('manager/updateProductInfo', { title: 'index' });
});

/*add product*/
router.get('/addNewProduct', function(req, res, next) {
  res.render('manager/addNewProduct', { title: 'index' });
});

/*get all transactions*/
router.get('/getAllTransaction', function(req, res, next) {
  res.render('manager/getAllTransaction', { title: 'index' });
});

/*User Log in*/
router.get('/login', function(req, res, next) {
  res.render('user/userLogin', { title: 'index' });
});

/*User Register*/
router.get('/register', function(req, res, next) {
  res.render('user/register');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/index');
});

/* cart */
router.get('/cart', function(req, res, next) {
  res.render('user/cart');
});

/* user profile*/
router.get('/profile', function(req, res, next) {
  res.render('user/profile');
});

/* users get all products*/
router.get('/products', function(req, res, next) {
  res.render('user/products');
});

/* single product detail*/
router.get('/single', function(req, res, next) {
  res.render('user/single');
});

module.exports = router;
