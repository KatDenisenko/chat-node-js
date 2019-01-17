const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
    time: String,
    content: String,
    author: String,
});

let Message = mongoose.model('Message', messageSchema);
module.exports = Message;