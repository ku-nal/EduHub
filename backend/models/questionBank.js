const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionBankSchema = new Schema({
  qTitle: {
    type: String,
    required: true,
  },
  qDesc: {
    type: String,
    required: true,
  },
  askedByUsername: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Number,
    default: () => Date.now(),
  },
  totalAnswers: {
    type: Number,
    default: 0,
  }
})

exports.questionBank = mongoose.model('questionBank', questionBankSchema, 'Questions')