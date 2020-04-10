module.exports = class Lobby {
  id;
  capacity;
  participants;
  status;
  constructor(id, capacity) {
    this.id = id;
    this.capacity = capacity;
    this.participants = [];
    this.status = "waiting for members";
  }
};
