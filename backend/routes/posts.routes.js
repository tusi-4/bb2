const express = require('express');
const router = express.Router();

const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo')
      .sort({created: -1});
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

//daje przed :id, zeby uniknac troubles
router.post('/posts/add', async (req, res) => {
  try {
    const { author, title, text, photo, price, phone, location } = req.body;
    
    const newPost = new Post({ author, created: new Date(), updated: new Date(), status: 'new', title, text, photo, price, phone, location });
    await newPost.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
