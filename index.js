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
    socket.join(lobbyId, () => {
      lobbies.push({ id: lobbyId, size: lobbySize });
      socket.emit("log", "Created lobby, lobby id: " + lobbyId);
    });

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

  function getLobby(lobbies, id, callback) {
    lobbies.forEach((lobby) => {
      if (lobby.id == id) {
        callback(lobby);
      }
    });
  }

  socket.on("joinLobby", (lobbyId) => {
    getLobby(lobbies, lobbyId, (lobby) => {
      console.log(lobby);
      if (lobby) {
        console.log("lobby");
        game.in(lobbyId).clients((err, clients) => {
          clients.forEach((client) => {
            if (client == socket.id) {
              console.log("duplicate");
              return;
            }
          });

          var currSize;
          currSize = clients.length;
          console.log(currSize);
          if (currSize < lobby.size) {
            socket.join(lobbyId, () => {
              currSize++;
              socket.currLobby = lobbyId;
              socket.broadcast.to(lobbyId).emit("log", "Member joined lobby ");
              socket.emit("log", "Joined lobby " + lobbyId);
              game.to(lobbyId).emit("log", "LobbySize: " + currSize); //Bug here: lobbysize not updating correctly
            });
            return;
          } else {
            socket.emit("error", { msg: "Lobby full", value: lobbyId });
          }
        });
      }
    });
  });

  socket.on("setName", (lobbyId, name) => {
    var lobby = getLobby(lobbies, lobbyId);
    if (!socket.name && lobby && socket.currLobby == lobby.id) {
      socket.broadcast.to(lobbyId).emit("log", "say hi to " + name);
      socket.name = name;
    } else {
      socket.emit("error", { msg: "Lobby non existant", value: lobbyId });
    }
  });
});

//chat only for testing
chat.on("connection", (socket) => {
  socket.on("chat", (data) => {
    chat.emit("log", socket.id + " says: " + data);
  });
});
