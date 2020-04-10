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

  socket.on("test", (...args) => {
    console.log("running test");
    socket.services.validation.checkInfix(
      args[0] || "halloJungs",
      args[1] || "jungs"
    );
  });

  socket.on("createLobby", (id, size) => {
    socket.services.lobby.createLobby(
      socket,
      size,
      id,
      (err, lobby, sessionId) => {
        if (err) {
          socket.emit("err", err);
        } else {
          socket.emit("log", "Created lobby, lobby id: " + lobby.id);
          socket.emit("log", "Got session id:" + sessionId);
        }
      }
    );
  });

  socket.on("joinLobby", (lobbyId) => {
    socket.services.lobby.joinLobby(
      socket,
      lobbyId,
      (err, lobby, sessionId) => {
        if (err) {
          socket.emit("err", err.message);
        } else {
          socket.broadcast.to(lobby.id).emit("log", "Member joined lobby ");
          socket.emit("log", "Joined lobby id: " + lobby.id);
          socket.emit("log", "Got session id: " + sessionId);
          game
            .to(lobbyId)
            .emit("log", "Lobby size: " + lobby.participants.length);
        }
      }
    );
  });

  socket.on("setName", (name) => {
    socket.services.lobby.setName(socket, name, (err, name, status) => {
      if (err) {
        socket.emit("err", err);
      } else {
        socket.emit("log", "name set to: " + name);
        socket.broadcast
          .to(socket.currLobby)
          .emit("log", name + " joined lobby ");
        if (status == "ready") {
          socket.broadcast.to(socket.currLobby).emit("log", "Lobby is ready");
        }
      }
    });
  });

  socket.on("getLobbySize", () => {
    socket.services.lobby.getLobbySize(socket, (err, capacity) => {
      if (err) {
        socket.emit("err", err);
      } else {
        socket.emit("data", capacity);
      }
    });
  });

  socket.on("rejoinLobby", (sessionId, lobbyId) => {
    socket.services.lobby.rejoinLobby(socket, lobbyId, sessionId, (err) => {
      if (err) {
        socket.emit("err", err.message);
      } else {
        socket.broadcast.to(lobbyId).emit("log", "Member rejoined lobby ");
        socket.emit("log", "Successfully rejoined lobby id: " + lobbyId);
      }
    });
  });

  socket.on("getNames", (lobbyId) => {
    socket.services.lobby.getParticipantNames(socket, lobbyId, (err, names) => {
      if (err) {
        socket.emit("err", err.message);
      } else {
        socket.emit("names", names);
      }
    });
  });
  socket.on("disconnect", (data) => {
    let tmp = socket.currLobby;
    if (data == "transport close") {
      socket.services.lobby.removeFromLobby(socket, (err) => {
        if (err) {
          console.log(err);
        }
        socket.broadcast.to(tmp).emit("log", "Member left lobby ");
      });
    }
  });
});

//chat only for testing
chat.on("connection", (socket) => {
  socket.on("chat", (data) => {
    chat.emit("log", socket.id + " says: " + data);
  });
});
