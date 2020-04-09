const { v4: uuidv4 } = require("uuid");
module.exports = class Participant {
  socketId;
  sessionId;
  name;
  status;
  constructor(socketId) {
    this.sessionId = uuidv4();
    this.socketId = socketId;
    this.status = "active";
  }
};
