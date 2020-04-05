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

//Express server
const server = app.listen(80, () => {
  console.log("listening on 80");
});

//Static Files -- this is only for testing this will later point to the built angular app
app.use(express.static("static"));

const io = socket(server);

//Namespaces
const chat = io.of("/admin");
const game = io.of("/game");
//Service Middleware
game.use(require("./middleware/serviceMiddleware")());

game.on("connection", (socket) => {
  console.log(socket.id, " connected");
  socket.emit("log", "Successfully connected, socket id: " + socket.id);

  socket.on("createLobby", (lobbySize) =>
    socket.services.lobby.createLobby(socket, lobbySize, (lobby) => {
      if (lobby) {
        socket.emit("log", "Created lobby, lobby id: " + lobby.id);
      } else {
        console.log("error");
      }
    })
  );

  socket.on("joinLobby", (lobbyId) => {
    socket.services.lobby.joinLobby(socket, lobbyId, (err, lobby) => {
      if (err) {
        console.log(err);
        socket.emit("err", err.message);
      } else {
        socket.broadcast.to(lobby.id).emit("log", "Member joined lobby ");
        socket.emit("log", "Joined lobby " + lobby.id);
        game
          .to(lobbyId)
          .emit("log", "Lobby size: " + lobby.participants.length);
      }
    });
  });

  socket.on("setName", (name) => {
    socket.services.lobby.setName(socket, name, (err, name) => {
      if (err) {
        socket.emit("err", err);
      } else {
        socket.emit("log", "name set to: " + name);
        socket.broadcast
          .to(socket.currLobby)
          .emit("log", "Member joined lobby ");
      }
    });
  });
});

//chat only for testing
chat.on("connection", (socket) => {
  socket.on("chat", (data) => {
    chat.emit("log", socket.id + " says: " + data);
  });
});
