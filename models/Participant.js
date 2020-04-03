const mongoose = require("mongoose");
const ParticipantSchema = new mongoose.Schema({
  socketId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false
  }
});

mongoose.model("Participant", ParticipantSchema);
