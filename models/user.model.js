const mongoose = require("mongoose");

const { Schema } = mongoose;


//SCHEMA
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid formated email"
        }
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        default: "Candidate"
    },
    postedJobs: {
        type: [mongoose.SchemaType.ObjectId]
    },
    appliedJobs: {
        type: [mongoose.SchemaType.ObjectId]
    },
    applications: {
        type: [mongoose.SchemaType.ObjectId]
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

// CREATING MODEL
module.exports = mongoose.model('User', userSchema);