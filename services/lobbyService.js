//Service to manage lobby

module.exports = function lobbyService() {
  const Lobby = require("../models/Lobby");
  const Participant = require("../models/Participant");
  const io = require("socket.io")();
  var lobbies = [];
  const LobbySizes = [4, 6, 8];

  function checkLobbyId(id) {
    for (let i = 0; i < lobbies.length; i++) {
      if (lobbies[i].id == id) {
        throw new Error("lobby id already taken");
      }
    }
  }
  function updateLobbyStatus(lobby) {
    if (lobby.participants.length == lobby.size) {
      lobby.status = "all members connected";
    }
    for (const participant of participants) {
      if (!participant.name) {
        return;
      }
    }
    lobby.status = "ready";
  }
  function checkName(name) {
    if (!name || name.length < 3) {
      throw new Error("Please provide a name of at least 3 characters");
    }
  }
  function getParticipant(lobby, socketId) {
    for (const participant of lobby.participants) {
      if (participant.socketId == socketId) {
        return participant;
      }
    }
    throw new Error("Participant not in lobby");
  }

  function removeParticipant(socket, lobby) {
    //only remove the socketId
    for (var i = 0; i < lobby.participants.length; i++) {
      if (lobby.participants[i].socketId == socket.id) {
        lobby.participants[i].socketId = null;
        lobby.participants[i].status = "disconnected";
        socket.currLobby = false;
        return;
      }
    }
  }
  async function checkDuplicate(lobbyId, socketId) {
    return await new Promise((resolve, reject) => {
      io.of("/game")
        .in(lobbyId)
        .clients((error, clients) => {
          if (error) throw error;
          for (const client of clients) {
            if (client == socketId)
              throw new Error("duplicate joining process");
          }
          resolve();
        });
    });
  }

  function checkFreeSpace(lobby) {
    if (lobby.participants >= lobby.capacity) {
      throw new Error("lobby full");
    }
  }

  function checkSize(size) {
    if (!LobbySizes.includes(size)) {
      throw new Error(
        "Size of " + size + " not supported, supported sizes are: " + LobbySizes
      );
    }
  }
  function getLobby(id) {
    for (let i = 0; i < lobbies.length; i++) {
      if (lobbies[i].id == id) {
        return lobbies[i];
      }
    }
    throw new Error("lobby non-existant");
  }
  function removeLobby(lobbyId) {
    for (let i = 0; i < lobbies.length; i++) {
      if (lobbies[i].id == lobbyId) {
        lobbies.slice(i, 1);
      }
    }
  }

  //exported service functions
  lobbyService.getLobbySize = (socket, callback) => {
    try {
      if (!socket.currLobby) {
        throw new Error("currently not in a lobby");
      }
      let lobby = getLobby(socket.currLobby);
      callback(false, lobby.capacity);
    } catch (error) {
      callback(error, false);
    }
  };

  lobbyService.createLobby = (socket, lobbySize, id, callback) => {
    try {
      if (socket.currLobby) {
        throw new Error("already in a lobby");
      }
      checkSize(lobbySize);

      let lobbyId;
      if (typeof id != String) {
        lobbyId = id.toString();
      } else {
        lobbyId = id;
      }

      checkLobbyId(lobbyId);
      var lobby = new Lobby(lobbyId, lobbySize);
      lobbies.push(lobby);

      lobbyService.joinLobby(socket, lobbyId, (err, lobby, sessionId) => {
        if (err) {
          throw err;
        } else {
          callback(false, lobby, sessionId);
        }
      });
    } catch (err) {
      callback(err.message, false, false);
    }
  };

  lobbyService.joinLobby = (socket, lobbyId, callback) => {
    try {
      if (socket.currLobby) {
        throw new Error("already in a lobby");
      }
      var lobby = getLobby(lobbyId);
      checkDuplicate(lobby.id, socket.id);
      checkFreeSpace(lobby);

      let participant = new Participant(socket.id);

      socket.join(lobbyId, () => {
        lobby.participants.push(participant);
        socket.currLobby = lobbyId;
        callback(false, lobby, participant.sessionId);
      });
    } catch (err) {
      callback(err, false, false);
    }
  };

  lobbyService.setName = (socket, name, callback) => {
    try {
      checkName(name);
      if (!socket.currLobby) {
        throw new Error("currently in no lobby");
      }

      let lobby = getLobby(socket.currLobby);
      let participant = getParticipant(lobby, socket.id);
      if (participant.name) {
        throw new Error("name already set");
      }

      participant.name = name;
      updateLobbyStatus(lobby);
      callback(false, participant.name, lobby.status);
    } catch (err) {
      callback(err, false, false);
    }
  };
  lobbyService.getParticipantNames = async (lobbyId, callback) => {
    try {
      let lobby = getLobby(lobbyId);
      let names = [];
      await lobby.participants.forEach((participant) => {
        names.push(participant.name);
      });

      callback(false, names);
    } catch (error) {
      callback(error, false);
    }
  };

  lobbyService.close = (lobbyId) => {
    console.log("closing empty lobby in 5 minutes");
    setTimeout(() => {
      console.log(lobbyId + " closed");
      removeLobby(lobbyId);
    }, 300000);
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

  lobbyService.rejoinLobby = (socket, lobbyId, sessionId, callback) => {
    try {
      if (socket.currLobby) {
        throw new Error("already in a lobby");
      }
      var lobby = getLobby(lobbyId);
      checkDuplicate(lobby.id, socket.id); //to check if client is already in that lobby
      for (let index = 0; index < lobby.participants.length; index++) {
        let participant = lobby.participants[index];

        if (participant.sessionId == sessionId) {
          participant.socketId = socket.id; //overwrite old socket id of participant
          socket.join(lobbyId, () => {
            socket.currLobby = lobbyId;
            callback(false);
          });
        }
      }
    } catch (error) {
      console.log(error);
      callback(error);
    }
  };
  return lobbyService;
};
