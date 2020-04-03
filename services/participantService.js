const mongoose = require("mongoose");
const Lobby = require("../models/Lobby");
const Participant = require("../models/Participant");

module.exports = function participantService() {
  participantService.createParticipant = (socketId, name, callback) => {
    //implement
    // .
    // .
    // .
    callback(/*id of participant*/);
  };

  participantService.remove = (socketId, callback) => {
    //implement
    // .
    // .
    // .
    callback(/*true if success*/);
  };

  participantService.getParticipant = (socketId, callback) => {
    //implement
    // .
    // .throw error if non existants
    // .
    callback(/*participant if found*/);
  };

  return participantService;
};
