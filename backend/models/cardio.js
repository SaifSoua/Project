const mongoose = require("mongoose");

const cardioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    distance: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const cardio = mongoose.model("cardio", cardioSchema);

module.exports = cardio;
