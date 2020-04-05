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
  function checkLobbyId(id) {
    for (let i = 0; i < lobbies.length; i++) {
      if (lobbies[i].id == id) {
        return false;
      }
    }
    return true;
  }

  function removeParticipant(socket, lobby) {
    for (var i = 0; i < lobby.participants.length; i++) {
      if (lobby.participants[i] == socket.id) {
        lobby.participants.splice(i, 1);
        socket.currLobby = false;
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
    if (socket.currLobby) {
      callback("already in a lobby", false);
      return;
    }
    let lobbyId;
    if (typeof id == String) {
      lobbyId = id.toString();
    } else {
      lobbyId = id;
    }
    if (!checkLobbyId(lobbyId)) {
      callback("lobby non existant", false);
    } else {
      socket.join(lobbyId, () => {
        var lobby = new Lobby(lobbyId, lobbySize);
        lobby.participants.push(socket.id);
        socket.currLobby = lobbyId;
        lobbies.push(lobby);
        callback(false, lobby);
      });
    }
  };

  lobbyService.joinLobby = (socket, lobbyId, callback) => {
    try {
      if (socket.currLobby) {
        throw new Error("already in a lobby");
      }
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

  lobbyService.close = (lobbyId) => {
    console.log("closing empty lobby in 10 seconds");
    setTimeout(() => console.log(lobbyId + " closed"), 10000);
  };

  lobbyService.removeFromLobby = (socket, callback) => {
    if (socket.currLobby) {
      try {
        var lobby = getLobby(socket.currLobby);
        removeParticipant(socket.id, lobby);
        if (lobby.participants.length == 0) {
          lobbyService.close(socket.currLobby);
        }
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

  return lobbyService;
};
