
const PORT  = process.env.PORT || 3003;
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const messageSchem = require('./models/messageSchema')
const io = require("socket.io")(server, {
   path: '/chat/',
   origins: "*:*"
});



mongoose.Promise = global.Promise;//заменяем промисы mongoose на промисы js Promise
mongoose.set('useNewUrlParser', true);//флаги необходимые для конкретной работы mongo db
mongoose.set('useFindAndModify', false);//флаги необходимые для конкретной работы mongo db
mongoose.set('useCreateIndex', true);//флаги необходимые для конкретной работы mongo db
mongoose.connect('mongodb://Admin:qwerty1@ds157064.mlab.com:57064/sandbox_go_it');//подключаемся к бд

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.options('*',cors());
//app.use('/api/messages/', messagesRoutes);
app.get('/', (req, res) => {
    messageSchem.find({}, (err,users) => {
        if (err) throw err;
        res.json(users)
    })
})



//let online = 0;


let online = 0;
io.on('connection', (client) => {
    
    console.log(++online);
    client.broadcast.emit("change-online", online);
   
    client.on("disconnect", () => {
        console.log(--online);
        client.broadcast.emit("change-online", online);
    });
    client.on("message", (message) => {
        client.broadcast.emit("new-message", message);
        let newMessage = messageSchem(message);
        console.log(newMessage);
        newMessage.save();
    });
    // client.on("All-message", (is) => {
    //    //let allMessages = messageSchem.find();
    //  //client.broadcast.emit("All-message", allMessages);
    // })
    
    client.on("typing", (is) => {
        client.broadcast.emit("somebody-typing", is);
    })
});

app.use((req, res, next) => {
    res
      .status(404)
      .json({err: '404'});
  });
  
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res
      .status(500)
      .json({err: '500'});
  });

 app.use(express.static('../build'));
server.listen(PORT,()=>(console.log(`Сервер запущен на порту ${PORT}`))) 