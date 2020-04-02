const mongoose = require("mongoose");
const Lobby = require("../models/Lobby");
const Participant = require("../models/Participant");

module.exports = function participantService() {
  participantService.createParticipant = (name, callback) => {
    //implement
    // .
    // .
    // .
    callback(/*id of participant*/);
  };

  participantService.remove = (participantId, callback) => {
    //implement
    // .
    // .
    // .
    callback(/*true if success*/);
  };

  participantService.checkParticipantId = (participantId, callback) => {
    //implement
    // .
    // .
    // .
    callback(/*true if participant is found*/);
  };

  return participantService;
};
