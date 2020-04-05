//Service to manage lobby

module.exports = function lobbyService() {
  //const game = io.of("/game");
  const Lobby = require("../models/Lobby");
  var lobbies = [];

  function getLobby(id) {
    for (let i = 0; i < lobbies.length; i++) {
      if (lobbies[i].id == id) {
        return lobbies[i];
      }
    }
    throw new Error("lobby non-existant");
  }

  function checkDuplicate(participants, socketId) {
    for (var i = 0; i < participants.length; i++) {
      let tmp = participants[i];
      if (tmp == socketId) {
        throw new Error("ducplicate joining");
      }
    }
  }

  // function getClients(lobbyId, callback) {
  //   game.in(lobbyId).clients((err, clients) => {
  //     if (err) {
  //       throw err;
  //     } else {
  //       callback(clients);
  //     }
  //   });
  // }
  function checkFreeSpace(lobby) {
    if (lobby.participants >= lobby.capacity) {
      throw new Error("lobby full");
    }
  }

  //exportet service functions
  lobbyService.createLobby = (socket, lobbySize, callback) => {
    lobbyId = "1234";
    socket.join(lobbyId, () => {
      var lobby = new Lobby(lobbyId, lobbySize);
      lobby.participants.push(socket.id);
      socket.currLobby = lobbyId;
      lobbies.push(lobby);
      console.log("created lobby, current lobbies: \n", lobbies);
      callback(lobby);
    });
  };

  lobbyService.joinLobby = (socket, lobbyId, callback) => {
    try {
      var lobby = getLobby(lobbyId);
      checkDuplicate(lobby.participants, socket.id);
      checkFreeSpace(lobby);

      socket.join(lobbyId, () => {
        lobby.participants.push(socket.id);
        socket.currLobby = lobbyId;
        callback(false, lobby);
      });
    } catch (err) {
      console.log(err);
      callback(err, false);
    }
  };

  lobbyService.setName = (socket, name, callback) => {
    try {
      if (!socket.currLobby) {
        throw new Error("currently in no lobby");
      }
      if (socket.name) {
        throw new Error("name already set");
      }
      socket.name = name;
      callback(false, socket.name);
    } catch (err) {
      callback(err, false);
    }
  };
  lobbyService.removeFromLobby = (socketId, callback) => {
    //implement
    // .
    // .
    // .
    callback(/*true if success*/);
  };

  lobbyService.checkLobbyId = (lobbyId, callback) => {
    //implement
    // .
    // .
    // .
    callback(/*true if lobby is found*/);
  };
  lobbyService.close = (lobbyId) => {
    //implement
    // .
    // .remove the Lobby from the database
    // .
  };

  return lobbyService;
};
