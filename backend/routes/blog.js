const express = require('express');
const router = express.Router();
const BlogPost = require('../models/blogPost');

// GET all blog posts
router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// GET blog
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post method
router.post('/create', async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const newPost = new BlogPost({
      title,
      description,
      image,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE blog
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await BlogPost.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT method
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Liking a blog post
router.post('/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    blogPost.likes++;
    const updatedPost = await blogPost.save();
    res.status(200).json({ likes: updatedPost.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Disliking a blog post
router.post('/:id/dislike', async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    blogPost.dislikes++;
    const updatedPost = await blogPost.save();
    res.status(200).json({ dislikes: updatedPost.dislikes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Loving a blog post
router.post('/:id/love', async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    blogPost.love++;
    const updatedPost = await blogPost.save();
    res.status(200).json({ love: updatedPost.love });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
