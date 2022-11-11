const mongoose = require('mongoose');
const ETFListSchema = new mongoose.Schema({
  name: String,
  code: String,
  custodyFee: Number,
  managementFee: Number,
  category: String,
}, { versionKey: false }
);

const ETFList = mongoose.model('ETFList', ETFListSchema);

module.exports = ETFList ;