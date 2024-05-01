const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: String,
  parentId: {
    type: Schema.Types.Mixed,
    default: null,
    ref: 'Comment',
  },
  qId: String,
  replies: [Object],
  answeredDate: Number,
});

exports.Comment = mongoose.model('Comment', CommentSchema, 'nestedComment');
