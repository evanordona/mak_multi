const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const server = http.createServer(app)
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;

const { Server } = require('socket.io')

app.use(cors())

// https://mak-game.onrender.com
// http://localhost:5173
const io = new Server(server, {
    cors: {
        origin: 'https://www.lordsduel.com',
        methods: ['GET', 'POST'],
    }
})

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("hello world!");
})

const rooms = {}

io.on('connection', (socket) => {

    // Hosting and joining room
    socket.on('joinRoom', (code) => {
        console.log(code);

        //join the room
        socket.join(code)

        if (!rooms[code]) {
            rooms[code] = 1
        } else if (rooms[code] < 2) {
            // if 2 players in room
            rooms[code] += 1
            if (rooms[code] == 2) {
                io.to(code).emit('startGame')
            }
        }
        console.log(rooms[code])
    })

    socket.on('gameOver', (code) => {
        if (rooms[code] && rooms[code] > 0) {
            rooms[code] -= 1
        }
    })

    socket.on('leaveLobby', (code) => {
        console.log("opponent left")
        socket.to(code).emit('leave')
    })

    socket.on('rerun', (code)=> {
        if (!rooms[code]) {
            rooms[code] = 1
        } else if (rooms[code] < 2) {
            // if 2 players in room
            rooms[code] += 1
            if (rooms[code] == 2) {
                io.to(code).emit('rematch')
            }
        }
    })

    socket.on('send-card', (card, code) => {
        console.log(card);

        // send card to other player in room
        socket.to(code).emit("receive-card", card)
    })


    socket.on('disconnect', () => {
        // Find the room the user was in
        const room = Object.keys(socket.rooms).find(room => room !== socket.id);
        if (room) {
            // Notify other users in the room
            socket.to(room).emit('leave');
    
            // Decrease the count or remove the room if empty
            if (rooms[room]) {
                rooms[room] -= 1;
                if (rooms[room] <= 0) {
                    delete rooms[room];
                }
            }
        }
    
        console.log('user disconnected');
    });


})

server.listen(port, () => {
    console.log(`app listening on port ${port}`)
})