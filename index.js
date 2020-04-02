const express = require("express");
const socket = require("socket.io");
const app = express();
const mongoose = require("mongoose");
const services = require("./services");

const Lobby = require("./models/Lobby");
const Participant = require("./models/Participant");

//Database
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Database connection successfull");
});

var lobbies = [];

//Express server
const server = app.listen(80, () => {
  console.log("listening on 80");
});

//Static Files
app.use(express.static("static"));

//Service Middleware
app.use(require("./middleware/serviceMiddleware")());

const io = socket(server);

const chat = io.of("/admin");

io.on("connection", socket => {
  io.sockets.emit("log", socket.id + " joined");
  console.log(socket.id, " joined");
  socket.on("chat", data => {
    console.log(data);
    io.sockets.emit("log", socket.id + " says: " + data);
  });
  socket.on("createLobby", lobbySize => {
    services.createLobby(lobbySize, lobbyId => {
      socket.emit(lobbyId);
    });
  });
});

io.on("joinLobby", lobbyId => {});

io.on("createLobby", lobbySize => {
  var lobby = new Lobby({ size: lobbySize });
  lobby.partipants = [socket.id];
});

chat.on("connection", socket => {
  chat.emit("chat", socket.id + " joined in admin");
  console.log(socket.id, " joined in admin");
  socket.on("chat", data => {
    console.log(data);
    chat.emit("log", socket.id + " says: " + data);
  });
});
