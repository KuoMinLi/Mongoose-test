const mongoose = require('mongoose');

const ETFContentSchema = new mongoose.Schema({
  ETFList : { 
    type: mongoose.Schema.ObjectId, 
    ref: 'ETFList' 
  },
  name: String,
  code: String,
  industry: String,
  percentage: Number
}, 
{ versionKey: false }
);

const ETFContent = mongoose.model('ETFContent', ETFContentSchema);
module.exports = ETFContent ;