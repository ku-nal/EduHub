// Rahul Goswami
const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new mongoose.Schema({
     title: {
          type: String,
          required: true,
     },
     description: {
          type: String,
          required: true,
     },
     courseId: {
          type: Number,
     },
     userId: {
          type: String,
     },
     instructor: {
          type: String,
     },
     category: {
          type: String,
     },
     image: {
          type: String,
     },
     price: {
          type: Number,
          required: true,
     },
     tags: {
          type: String,
          required: true,
     },
     created_at: {
          type: Date,
          default: Date.now,
     },
     updated_at: { // Corrected field name
          type: Date,
          default: Date.now,
     }
});

exports.Course = mongoose.model('Course', courseSchema); 
