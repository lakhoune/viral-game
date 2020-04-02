const mongoose = require("mongoose");
const ParticipantSchema = new mongoose.Schema({
  _id: {
    type: mongoose.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

mongoose.model("Participant", ParticipantSchema);
