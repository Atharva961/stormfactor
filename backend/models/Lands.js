const mongoose = require('mongoose');
const { Schema } = mongoose;

const LandSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    city:{
        type: String,
        required: true
    },
    nitrogen:{
        type: Number,
        default: -1
    },
    phosphorous:{
        type: Number,
        default: -1
    },
    potassium:{
        type: Number,
        default: -1
    },
    avg_temperature:{
        type: Number,
        default: -1
    },
    avg_humidity:{
        type: Number,
        default: -1
    },
    ph:{
        type: Number,
        default: -1
    },
    rainfall:{
        type: Number,
        default: -1
    }
});

module.exports = mongoose.model('land', LandSchema);