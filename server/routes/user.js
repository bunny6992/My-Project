const express = require('express')
const User = require('../models/user')
const router = express.Router()

router
.get('/', async (req, res) => {
  try {
    const users = await User.getAllUsers();
    console.log(users)
    res.send(users); 
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.post('/login', async (req, res) => {
  try {
    let user = await User.login(req.body); // {userName: "cathy123", password: "icecream"}
    res.send({...user, password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message}) // "Username not found"
  }
})

.post('/register', async(req, res) => {
  try {
    let user = await User.register(req.body);
    res.send({...user, password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message}) // "Username not found"
  }
})

.put('/edit', async (req, res) => {
  try  {
    let user = await User.editUser(req.body);
    res.send({...user, password: undefined})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.delete('/delete', async (req, res) => {
  try {
    await User.deleteUser(req.body);
    res.send({success: "We'll miss you!!! :`("})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

module.exports = router;