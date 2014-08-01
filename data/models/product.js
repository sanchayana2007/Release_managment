var mongoose = require('mongoose');

//Make a Model with the schemas for doing the CRUD
var ProductSchema = new mongoose.Schema({
productname: String,
productnumber: { type: Number, default: 1 },
description: String,

});
var P = mongoose.model('Product', ProductSchema);
console.log("DEBUG:/MODEL/product");
mongoose.connect( 'mongodb://localhost/Product' );
module.exports = P;
