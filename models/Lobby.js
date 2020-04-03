const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema({
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
