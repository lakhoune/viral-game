const express = require("express");
const socket = require("socket.io");
const app = express();
// const mongoose = require("mongoose");
// const services = require("./services");

// const Lobby = require("./models/Lobby");
// const Participant = require("./models/Participant");

//Database -- only local for now
// mongoose.connect("mongodb://localhost/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Database connection successfull");
// });

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
const game = io.of("/game");

game.on("connection", (socket) => {
  console.log(socket.id, " connected");
  socket.emit("log", "Successfully connected, socket id: " + socket.id);

  socket.on("createLobby", (lobbySize) => {
    lobbyId = "1234";
    socket.join(lobbyId);
    lobbies.push({ id: lobbyId, size: lobbySize });
    socket.emit("log", "Created lobby, lobby id: " + lobbyId);
    // services.lobby.createLobby(lobbySize, (lobbyId) => {
    //   lobbies.push(lobbyId);
    //   services.lobby.addToLobby(lobbyId, socket.id, (result) => {
    //     if (result) {
    //       //create socket io room
    //       //let creator join the room
    //       socket.join(lobbyId);
    //       socket.emit("log", "Created lobby, loby id: " + lobbyId);
    //     }
    //   });
    //});
    //create socket io room
  });

  socket.on("joinLobby", (lobbyId) => {
    lobbies.forEach((lobby) => {
      console.log(game.in(lobbyId).clients.length < lobby.size);
      if (lobby.id == lobbyId && game.in(lobbyId).clients.length < lobby.size) {
        socket.join(lobbyId, () => {
          socket.broadcast.to(lobbyId).emit("log", "Member joined lobby ");
          socket.emit("log", "Joined lobby " + lobbyId);
          game
            .in(lobbyId)
            .emit("log", "LobbySize: " + game.in(lobbyId).clients.length); //Bug here: lobbysize not updating
        });
        return;
      }
    });
  });

  //  socket.on("setName", (participantId, lobbyId, name) => {
  // if (lobbies.includes(lobbyId)) {
  //   services.participant.setName(participantId, name, (result) => {
  //     if (result) {
  //       io.to(lobbyId).emit("log", name + " joined he lobby");
  //       socket.name = name;
  //     }
  //   });
  // } else {
  //   socket.emit("error", { msg: "Lobby non existant", value: lobbyId });
  // }
  //  });
  //set name and create participant inside room
});

//chat only for testing
chat.on("connection", (socket) => {
  socket.on("chat", (data) => {
    chat.emit("log", socket.id + " says: " + data);
  });
});
