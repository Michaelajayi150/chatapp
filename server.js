const express = require("express")
const dbConn = require("./server/utils/dbconnect") //Import the utility for connecting to the database
const {createServer} = require("http") 
const app = express()
const {Server} = require("socket.io") 
const server = createServer(app)
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const {allowCrossDomain} = require("./server/middleware/corsHandler")
const user_controller = require("./server/controllers/userController")
const room_controller = require("./server/controllers/roomController")
const chat_controller = require("./server/controllers/chatController")
const PORT = process.env.PORT || 9000
app.use(cors())
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())
//Connect to db

dbConn()
   .then(console.log(`Connected to database`))
   .catch(e => { console.error("Couldn't connect because", e) })
server.listen(PORT, () => {
   console.log(`Server cooking at port ${PORT}`)
})
// app.get('/status', (req, res) => {
//    const status = {
//       "Status": "Running"
//    }
//    res.send(status)
// })
app.get("/", (req, res) => {
   res.json({"message": "Server side for Odin Chat online"})
})
/*Auth endpoints */
app.post("/signup", user_controller.createUser)
app.post("/login", user_controller.loginUser)

/*Chat endpoints here */
app.get("/chatroom/:id", room_controller.getRoom)
app.post("/chatroom/:id", chat_controller.sendChat)

/*Chatroom endpoints start */ 

app.get("/chatroom", room_controller.getAllRooms)
app.post("/chatroom", room_controller.createChatRoom)
app.delete("/chatroom/:id", room_controller.deleteRoom)
