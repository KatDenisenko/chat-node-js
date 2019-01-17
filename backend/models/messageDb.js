const mongoose = require('mongoose');
const Message = require('./messageSchema');

module.exports.getMessages = function () {
    return Message.find();
}

module.exports.postMessageToDb = function (data) {
    let newMessage = Message({
        time: data.time,
        content: data.message,
        author: data.author,
     
    })
    return newMessage.save();
}


module.exports.deleteMessageFromDb = function (id) {
    return Message.findByIdAndRemove(id);
}

