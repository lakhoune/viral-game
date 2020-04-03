const mongoose = require("mongoose");
const Lobby = require("../models/Lobby");
const Participant = require("../models/Participant");

module.exports = function lobbyService() {
  lobbyService.createLobby = (lobbySize, callback) => {
    //implement
    // .
    // .
    // .
    callback(/*id of lobby*/);
  };
  lobbyService.checkFreeSpace = (lobbyId, callback) => {
    //implement
    // .
    // .
    // .
    callback(/*true if lobby.size-participants.length>0*/);
  };
  lobbyService.addToLobby = (lobbyId, socketId, callback) => {
    //implement
    // .
    // .
    // .
    callback(/*true if success*/);
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
  lobbyService.close = lobbyId => {
    //implement
    // .
    // .remove the Lobby from the database
    // .
  };

  return lobbyService;
};
