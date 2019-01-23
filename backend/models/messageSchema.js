const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
    time: String,
    content: String,
    author: String,
    messId: String,
    addAt:{type:Date, default:Date.now},
},
{
    versionKey:false,
    collation: "MessageCollection"
});

let Message = mongoose.model('Message', messageSchema);
module.exports = Message;