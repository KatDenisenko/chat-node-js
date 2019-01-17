const express = require('express');
const router = express.Router();
const ctrlMessages = require('../controllers/messagesControllers');

router.get('/', ctrlMessages.getAllMessages);

router.post('/', ctrlMessages.postMessage)



router.delete('/:id', ctrlMessages.deleteMessage)



module.exports = router;