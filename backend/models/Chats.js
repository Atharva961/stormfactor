const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    messages: {
        type: [],
        default: []
    }
});

const Chat = mongoose.model('chat', ChatSchema);
module.exports = Chat;