const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogPostSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String
  },
  likes: {
    type: Number, 
    default: 0,
  },
  dislikes: {
    type: Number, 
    default: 0,
  },
  love: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
