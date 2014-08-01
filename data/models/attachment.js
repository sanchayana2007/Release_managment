var mongoose = require('mongoose');

//Make a Model with the schemas for doing the CRUD
var AttachmentSchema = new mongoose.Schema({
filename: String,
attachmentnumber: {type: Number, default: 1 },
featurenumber: {type: Number, default: 0 },
releasenumber: { type: Number, default: 0 },
productnumber: { type: Number, default: 0 },
meetingnumber: { type: Number, default: 0 },
description: String,

});
var P = mongoose.model('Attachment', AttachmentSchema);
console.log("DEBUG:/MODEL/product");
module.exports = P;
