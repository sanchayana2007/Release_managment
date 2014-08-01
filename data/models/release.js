require('./product');
var mongoose = require('mongoose');
//Make a Model with the schemas for doing the CRUD
var ReleaseSchema = new mongoose.Schema({
releasename: String,
releasenumber: Number,
productnumber: Number,
Startdate: String,
EndDate: Date,
ReleaseType: String,

});
var R = mongoose.model('Release', ReleaseSchema);
console.log("DEBUG:/MODEL/Release");
//mongoose.connect( 'mongodb://localhost/Release' );
module.exports = R;
