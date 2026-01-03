const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const allPosts = await pool.query(
      'SELECT posts.*, users.name as author, users.profile_photo as avatar FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC'
    );
    
    // Transform data to match frontend expectations if necessary
    // The frontend expects: id, author, avatar, time, title, content, tags, image, likes, comments
    const posts = allPosts.rows.map(post => ({
      id: post.id,
      author: post.author,
      avatar: post.avatar,
      time: new Date(post.created_at).toLocaleDateString(), // Simple formatting for now
      title: post.title,
      content: post.content,
      tags: post.tags || [],
      image: post.image_url,
      likes: post.likes || 0,
      comments: 0 // Comments not implemented yet
    }));

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// CREATE a post
router.post('/', async (req, res) => {
  try {
    const { user_id, title, content, image_url, tags } = req.body;
    
    // Validate inputs
    if (!user_id || !title || !content) {
        return res.status(400).json("Missing required fields");
    }

    const newPost = await pool.query(
      'INSERT INTO posts (user_id, title, content, image_url, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [user_id, title, content, image_url, tags]
    );

    // Fetch the full post with author details to return
    const fullPost = await pool.query(
        'SELECT posts.*, users.name as author, users.profile_photo as avatar FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = $1',
        [newPost.rows[0].id]
    );

    const post = {
        id: fullPost.rows[0].id,
        author: fullPost.rows[0].author,
        avatar: fullPost.rows[0].avatar,
        time: "Just now",
        title: fullPost.rows[0].title,
        content: fullPost.rows[0].content,
        tags: fullPost.rows[0].tags || [],
        image: fullPost.rows[0].image_url,
        likes: 0,
        comments: 0
    };

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
