const mongoose = require("mongoose");

const { Schema } = mongoose;
//SCHEMA
const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        required: true
    },
    applications: {
        type: [mongoose.SchemaTypes.ObjectId]
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})


//CREATING MODEL
module.exports = mongoose.model('Jobs', jobSchema);