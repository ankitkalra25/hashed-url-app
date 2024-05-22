const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  hash: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, default: null },
  singleUse: { type: Boolean, default: false },
  useCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Url', urlSchema);