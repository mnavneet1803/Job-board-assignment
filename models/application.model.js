const mongoose = require("mongoose");

const { Schema } = mongoose;


//SCHEMA
const applicationSchema = new Schema({
  'name': { type: String, require: true },
  'email': { type: String, require: true },
  'resume': { type: String, require: true },
  'coverletter': { type: String, require: true },
  'jobId': {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
})


//CREATING MODEL
module.exports = mongoose.model('Application', applicationSchema);