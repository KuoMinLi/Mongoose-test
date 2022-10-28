const mongoose = require('mongoose');
const toDoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A to do must have a title'],
  },
  done: Boolean,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
    },  
  },
  {
    versionKey: false,
  }
);
const ToDo = mongoose.model('ToDo', toDoSchema);
module.exports = ToDo;