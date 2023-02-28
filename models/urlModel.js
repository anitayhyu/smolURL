const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new mongoose.Schema({
  urlId: {
    type: String,
    required: true,
  },
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
});

module.exports = mongoose.model("Url", UrlSchema);
