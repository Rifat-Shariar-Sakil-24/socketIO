// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // io.on('connection', (socket) => {
// //     console.log('a user connected');
// //    io.on('connection', (socket) => {
// //   socket.on('chat message', (msg) => {
// //     io.emit('chat message', msg);
// //   });
// // });
// //     socket.on('disconnect', () => {
// //       console.log('user disconnected');
// //     });
// //   });
// // io.on('connection', (socket) => {
    
// //     socket.on('chat message', (msg) => {
// //       io.emit('chat message', msg);
// //     });
// //   });
// io.on('connection', (socket) => {
//     console.log('a user connected, socket ID:', socket.id); 
   
//     io.emit('chat entry', socket.id + " has joined");

//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg, socket.id);
//     });

//     socket.on('disconnect', () => {
//       console.log('user disconnected, socket ID:', socket.id); 
//     });
// });

// server.listen(3000, () => {
//   console.log('listening on *:3000');
// });




















require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));



const url = 'mongodb+srv://'+process.env.DBNAME+':'+process.env.DBPASS+'@cluster0.qrtll88.mongodb.net/socketio'


connectDB().then(() => {
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function connectDB() {
    try {
        await mongoose.connect(url);   
    } 
    catch (error) {
        throw new Error('Error connecting to MongoDB: ' + error.message);
    }
    
}
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});
const User = mongoose.model('user', userSchema);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});


app.get('/users', (req,res)=>{
  res.sendFile(__dirname+'/users.html');
})

app.get("/userList", async (req, res) => {
  const users = await User.find({});
  console.log(users);
  const names = users.map((item) => item.username);
  console.log(names);
  res.json(names);
});


io.on('connection', (socket) => {
    console.log('a user connected, socket ID:', socket.id); 
    socket.on('register', async (username,password) => {
      console.log(username,password);
      const user = new User({ username,password });
      await user.save();
      io.emit('users', username + " has registered");
    })
    
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});