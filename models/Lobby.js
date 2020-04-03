const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema({
  id: {
    type: String,
    required: false //false because we will assign it after creation
  },
  size: {
    type: Number,
    required: true
  },
  participants: {
    type: [String],
    required: false
  }
});

mongoose.model("Lobby", LobbySchema);
