const express = require("express");
const socket = require("socket.io");
const app = express();
const mongoose = require("mongoose");
const services = require("./services");

const Lobby = require("./models/Lobby");
const Participant = require("./models/Participant");

//Database -- only local for now
mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connection successfull");
});

var lobbies = [];

//Express server
const server = app.listen(80, () => {
  console.log("listening on 80");
});

//Static Files -- this is only for testing this will later point to the built angular app
app.use(express.static("static"));

//Service Middleware
app.use(require("./middleware/serviceMiddleware")());

const io = socket(server);
const chat = io.of("/admin");

io.on("connection", (socket) => {
  //console.log(socket.id, " connected");

  socket.on("createLobby", (lobbySize) => {
    services.lobby.createLobby(lobbySize, (lobbyId) => {
      lobbies.push(lobbyId);
      services.lobby.addToLobby(lobbyId, socket.id, (result) => {
        if (result) {
          //create socket io room
          //let creator join the room
          socket.emit("msg", "Success");
        }
      });
    });
    //create socket io room
  });

  socket.on("joinLobby", (lobbyId) => {
    services.lobby.checkFreeSpace(lobbyId, (free) => {
      if (free) {
        services.lobby.addToLobby(socket.id, (result) => {
          if (result) {
            //let participant join the room
            socket.emit("msg", "Success");
          }
        });
      } else {
        socket.emit("error", { msg: "Lobby full", value: lobbyId });
      }
    });
  });

  socket.on("setName", (participantId, lobbyId, name) => {
    if (lobbies.includes(lobbyId)) {
      services.participant.setName(participantId, name, (result) => {
        if (result) {
          io.to(lobbyId).emit("log", name + " joined he lobby");
          socket.name = name;
        }
      });
    } else {
      socket.emit("error", { msg: "Lobby closed", value: lobbyId });
    }
  });
  //set name and create participants inside room
});

//chat only for testing
chat.on("connection", (socket) => {
  chat.emit("chat", socket.id + " joined in chat");
  console.log(socket.id, " connected to chat");

  socket.on("chat", (data) => {
    chat.emit("log", socket.id + " says: " + data);
  });
});
