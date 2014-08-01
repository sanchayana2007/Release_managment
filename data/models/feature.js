require('./product');
var mongoose = require('mongoose');
//Make a Model with the schemas for doing the CRUD
var FeatureSchema = new mongoose.Schema({
featurename: String,
featurenumber: Number,
releasenumber: Number,
description: String,
moduleEffected: String,
architecturedespcription: String,
designdescription: String,
Startdate: String,
EndDate: String,
ReleaseType: String,
owner: String,
Status: String,

});
var R = mongoose.model('Feature', FeatureSchema);
console.log("DEBUG:/MODEL/Release");
//mongoose.connect( 'mongodb://localhost/Release' );
module.exports = R;
