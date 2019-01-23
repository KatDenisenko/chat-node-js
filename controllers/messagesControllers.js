const db = require('../models/userDb');

module.exports.getAllMessages = (req, res) => {
    db
    .getMessages()
    .then (data => {
        res.json(data)
    })
    .catch((err) =>{
        res
        .status(400)
        .json({err: err.message});
    })
};

module.exports.postMessage = (req, res) => {
    db
    .postMessageToDb(req.body)
    .then((results) => {
      res
        .status(201)
        .json(`User created! ${results}`);
    })
    .catch((err) => {
      res
        .status(400)
        .json({err: err.message});
    })
}



module.exports.deleteMessage = (req, res) => {
    db
    .deleteMessageFromDb(req.params.id)
    .then (data => {
        res.json(200, 'Message deleted!')
    })
    .catch((err) =>{
        res
        .status(400)
        .json({err: err.message});
    })
}

// module.exports.updateUser = (req, res) => {
//     db
//     .updateUserToDb(req.params._id, { username: req.body.username, password: req.body.password})
//     .then (data => {
//         res.json(200, 'User update!')
//     })
//     .catch((err) =>{
//         res
//         .status(400)
//         .json({err: err.message});
//     })
// }