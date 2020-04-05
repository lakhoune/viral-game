//Service to manage lobby

module.exports = function lobbyService() {
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
  function removeParticipant(socketId, lobby) {
    for (var i = 0; i < lobby.participants.length; i++) {
      if (lobby.participants[i] == socketId) {
        lobby.participants.splice(i, 1);
        return;
      }
    }
  }
  function checkDuplicate(participants, socketId) {
    for (var i = 0; i < participants.length; i++) {
      let tmp = participants[i];
      if (tmp == socketId) {
        throw new Error("ducplicate joining");
      }
    }
  }

  function checkFreeSpace(lobby) {
    if (lobby.participants >= lobby.capacity) {
      throw new Error("lobby full");
    }
  }

  //exported service functions
  lobbyService.createLobby = (socket, lobbySize, id, callback) => {
    let lobbyId;
    if (typeof id == String) {
      lobbyId = id.toString();
    } else {
      lobbyId = id;
    }

    socket.join(lobbyId, () => {
      var lobby = new Lobby(lobbyId, lobbySize);
      lobby.participants.push(socket.id);
      socket.currLobby = lobbyId;
      lobbies.push(lobby);
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
  lobbyService.removeFromLobby = (socket, callback) => {
    if (socket.currLobby) {
      try {
        var lobby = getLobby(socket.currLobby);
        removeParticipant(socket.id, lobby);
        callback(false);
      } catch (err) {
        callback(err);
      }
    }
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
