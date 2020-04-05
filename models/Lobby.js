module.exports = class Lobby {
  id;
  capacity;
  participants;

  constructor(id, capacity) {
    this.id = id;
    this.capacity = capacity;
    this.participants = [];
  }
};
