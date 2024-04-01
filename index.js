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





















const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/register.html');
});


app.get('/users', (req,res)=>{
  res.sendFile(__dirname+'/users.html');
})

// io.on('connection', (socket) => {
//     console.log('a user connected');
//    io.on('connection', (socket) => {
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
// });
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });
// io.on('connection', (socket) => {
    
//     socket.on('chat message', (msg) => {
//       io.emit('chat message', msg);
//     });
//   });

//ager
io.on('connection', (socket) => {
    console.log('a user connected, socket ID:', socket.id); 
    socket.on('register', (username,password) => {
      console.log(username,password);
      io.emit('users', username + " has registered");
    })
    
   
    // io.emit('chat entry', socket.id + " has joined");

    // socket.on('chat message', (msg) => {
    //   io.emit('chat message', msg, socket.id);
    // });

    // socket.on('disconnect', () => {
    //   console.log('user disconnected, socket ID:', socket.id); 
    // });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});