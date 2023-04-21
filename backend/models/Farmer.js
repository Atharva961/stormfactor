const mongoose = require('mongoose');
const { Schema } = mongoose;

const FarmerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: Date.now
    }
});

const Farmer = mongoose.model('farmer', FarmerSchema);
module.exports = Farmer;