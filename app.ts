const express = require("express");
const socket = require("socket.io");
const middleware = require("../middleware/serviceMiddleware.js")


//Express server
const app = express();
const server = app.listen(80, () => {
  console.log("listening on 80");
});

//Static Files -- this is only for testing this will later point to the built angular app
app.use(express.static("static"));
const io = socket(server);

//Namespaces
const chat = io.of("/admin");
const gameSocket = io.of("/game");

//Service Middleware
gameSocket.use(middleware);

gameSocket.on("connection", (socket) => {
  console.log(socket.id, " connected");
  socket.emit("log", "Successfully connected, socket id: " + socket.id);

  socket.on("test", (...args) => {
    console.log("running test");
    socket.services.validation.checkInfix(args[0] || "halloJungs", args[1] || "jungs");
  });

  socket.on("createLobby", (id, size) => {
    socket.services.lobby.createLobby(socket, size, id, (err, lobby, sessionId) => {
      if (err) {
        console.log("createLobby:", err);
        socket.emit("err", err, err.message);
      } else {
        socket.emit("log", "Created lobby, lobby id: " + lobby.id);
        socket.emit("log", "Got session id: " + sessionId);
        socket.emit("lobbyID", lobby.id);
        socket.emit("token", sessionId);
      }
    });
  });

  socket.on("joinLobby", (lobbyId) => {
    socket.services.lobby.joinLobby(socket, lobbyId, (err, lobby, sessionId) => {
      if (err) {
        console.log("joinLobby:", err);
        socket.emit("err", err, err.message);
      } else {
        socket.broadcast.to(lobby.id).emit("log", "Member joined lobby ");
        socket.emit("log", "Joined lobby id: " + lobby.id);
        socket.emit("log", "Got session id: " + sessionId);
        socket.emit("token", sessionId);
        socket.emit("lobbyID", lobby.id);
        gameSocket.to(lobbyId).emit("log", "Lobby size: " + lobby.participants.length);
      }
    });
  });

  socket.on("setName", (name) => {
    socket.services.lobby.setName(socket, name, (err, name, status) => {
      if (err) {
        console.log("setName:", err);
        socket.emit("err", err);
      } else {
        socket.emit("log", "name set to: " + name);
        socket.emit("newName", name); //send name to user
        socket.broadcast.to(socket.currLobby).emit("log", name + " joined lobby ");
        socket.broadcast //send name to all other users
          .to(socket.currLobby)
          .emit("newName", name);

        if (status == "20") {
          socket.broadcast.to(socket.currLobby).emit("log", "Lobby is ready, starting soon...");
          socket.services.game.createGame(socket, (err, lobby) => {
            if (err) {
              console.log("createGame:", err);
              socket.emit("err", err, err.message);
            } else {
              assignClients(lobby, (err) => {
                if (err) {
                  console.log(err);
                }
              });
            }
          });
        }
      }
    });
  });

  socket.on("getLobbySize", () => {
    socket.services.lobby.getLobbySize(socket, (err, capacity) => {
      if (err) {
        console.log("getLobbySize:", err);
        socket.emit("err", err);
      } else {
        socket.emit("data", capacity);
      }
    });
  });

  socket.on("rejoinLobby", (sessionId, lobbyId) => {
    socket.services.lobby.rejoinLobby(socket, lobbyId, sessionId, (err) => {
      if (err) {
        console.log("rejoinLobby:", err);
        socket.emit("err", err.message);
      } else {
        socket.broadcast.to(lobbyId).emit("log", "Member rejoined lobby ");
        socket.emit("log", "Successfully rejoined lobby id: " + lobbyId);
        socket.emit("lobbyID", lobbyId);
      }
    });
  });

  socket.on("getNames", (lobbyId) => {
    socket.services.lobby.getParticipantNames(socket, lobbyId, (err, names) => {
      if (err) {
        console.log("getNames:", err);
        socket.emit("err", err.message);
      } else {
        socket.emit("names", names);
      }
    });
  });
  socket.on("disconnect", (data) => {
    let tmp = socket.currLobby;
    console.log(socket + " disconnected", "reason: ", data);
    if (tmp) {
      socket.services.lobby.removeFromLobby(socket, (err) => {
        if (err) {
          console.log("removeFromLobby:", err);
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

function getSocketsInRoom(room) {
  return io.of("/game").in(room).connected;
}
function getSocket(socketId, room) {
  return getSocketsInRoom(room)[socketId];
}

function logClients(room, s) {
  //This function returns the wrong clients for team DNA for some reason
  //even though clients are properly assigned to rooms (as seen by broadcast to frontend clients)
  gameSocket.in(room).clients((error, clients) => {
    if (error) throw error;
    if (s == "DNA") {
      console.log("DNA members: ", clients);
    } else {
      console.log("RNA members: ", clients);
    }
  });
}
//assigns clients to their team room
function assignClients(lobby, callback) {
  try {
    for (let member of lobby.game.DNA.members) {
      let sock = getSocket(member.socketId, lobby.id); //get socket of participant
      if (sock) {
        sock.join(`DNA${lobby.id}`).emit("log", "Joined Team DNA"); //join room for team dna
      } else {
        throw new Error("sock undefined" + member.socketId);
      }
    }
    for (let member of lobby.game.RNA.members) {
      let sock = getSocket(member.socketId, lobby.id); //get socket of participant
      if (sock) {
        sock.join(`RNA${lobby.id}`).emit("log", "Joined Team RNA"); //join room for team dna
      } else {
        throw new Error("sock undefined" + member.socketId);
      }
    }
    //logClients(`DNA${lobby.id}`, "DNA");
    //logClients(`RNA${lobby.id}`, "RNA");
    gameSocket.in(`DNA${lobby.id}`).emit("log", "Your team: " + lobby.game.DNA.names);
    gameSocket.in(`RNA${lobby.id}`).emit("log", "Your team: " + lobby.game.RNA.names);

    callback(null);
  } catch (error) {
    callback(error);
  }
}
