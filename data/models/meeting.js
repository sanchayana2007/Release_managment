require('./product');
var mongoose = require('mongoose');
//Make a Model with the schemas for doing the CRUD
var MeetingSchema = new mongoose.Schema({
meetingAgenda: String,
meetingnumber: Number,
discussion: String,
mom: Number,
conclusion: String,
attendes: String,
date: String,
EndDate: String,
MeetingType: String,
Presenter: String,

});
var R = mongoose.model('Meeting', MeetingSchema);
console.log("DEBUG:/MODEL/meeting");
//mongoose.connect( 'mongodb://localhost/Release' );
module.exports = R;
