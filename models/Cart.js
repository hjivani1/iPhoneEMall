var mongoose = require('mongoose');
var CartSchema = new mongoose.Schema({
	uId: String,
    cId: String,
    cName: String,
    cPrice: Number,
    cImgSrc: String,
    cQuantity: Number
});

module.exports = mongoose.model('Cart', CartSchema);