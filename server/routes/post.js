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

.post('/user-posts', async (req, res) => {
  try {
    let posts = await Post.getAllUserPosts(req.body);
    res.send(posts)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.post('/create', async (req, res) => {
  try {
    let posts = await Post.createPost(req.body);
    res.send(posts)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.put('/edit', async (req, res) => {
  try  {
    await Post.editPost(req.body);
    res.send({success: "Post updated successfully"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.delete('/delete', async (req, res) => {
  try {
    await Post.deletePost(req.body);
    res.send({success: "There you go. Its gone now!"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

module.exports = router;