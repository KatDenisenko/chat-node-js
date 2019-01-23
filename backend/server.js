
const PORT  = process.env.PORT || 3003;
const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const {Strategy} = require('passport-jwt');
const {jwt} = require('./config');
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

passport.use(new Strategy(jwt, function(jwt_payload, done){
    if(jwt_payload !=void(0)) {
        return done(false, jwt_payload);
    }
    done();
}))
mongoose.set('debug', true);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.options('*',cors());

// require('./routs/routs')(app);
require('./sockets')(io);
//app.use('/api/messages/', messagesRoutes);


// app.get('/', (req, res) => {
//     messageSchem.find({}, (err,users) => {
//         if (err) throw err;
//         res.json(users)
//     })
// })



//let online = 0;


// let online = 0;
// io.on('connection', (client) => {
    
//     let allMessages = messageSchem.find().sort({Addat: 1}).limit(10).lean();//избавляемся от лишней информации, которая к нам приходит

//             allMessages.exec(function(err,docs){//.sort('-time').limit(10).
//                     if(err) throw err;
//                     console.log('Send message from DB');
//                     client.emit("All-message", docs);
//                     console.log(docs);
//                     console.log('Messages from DB');
//              })
    
//     console.log(++online);
//     client.broadcast.emit("change-online", online);
   
//     client.on("disconnect", () => {
//         console.log(--online);
//         client.broadcast.emit("change-online", online);
//     });
//     client.on("message", (message) => {
//         messageSchem.create(message, err => {
//             if(err) return console.error(err);
//             client.broadcast.emit("new-message", message);
//         })
//     });
//     client.on("deletMessage", (messageId) => {
//         messageSchem.findOneAndDelete({messId:messageId}, err=> {
//             if (err) throw err;
//             console.log('message delete')
//             client.broadcast.emit("messageWasDeleted", messageId);
//         })
//     });

//     client.on("user-online", (userName)=>{
//         client.broadcast.emit("userAddedOnline", userName)
//     })

//     client.on("editMessage", (id, editMess) => {
//         messageSchem.findOneAndUpdate({messId: id}, editMess, err => {
//             if (err) throw err
//             console.log('Message succsessfully edit!')
//             client.broadcast.emit("message-was-edited", editMess);
//         })
//     })


    
  
//     // client.on("All-message", (is) => {
//     //    //let allMessages = messageSchem.find();
//     //  //client.broadcast.emit("All-message", allMessages);
//     // })
    
//     client.on("typing", (is) => {
//         client.broadcast.emit("somebody-typing", is);
//     })
// });

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
  })

  app.use(express.static('../frontend/build'));
server.listen(PORT,()=>(console.log(`Сервер запущен на порту ${PORT}`))) 