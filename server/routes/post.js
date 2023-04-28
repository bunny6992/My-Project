const express = require('express')
const Post = require('../models/post')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.send(posts); 
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

module.exports = router;