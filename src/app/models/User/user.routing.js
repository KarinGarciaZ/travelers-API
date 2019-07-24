const express = require('express')
const router = express.Router()
const user = require('./user.model')

router

.get('/:id', (req, res) => {
  user.getOne(req.params.id, res)
})

.post('/', (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    statusItem: 0,
  }

  user.saveOne(newUser, res)
})

.post('/userInfo', (req, res) => {
  const userInfo = {
    biography: req.body.biography,
    phone: req.body.phone,
    gender: req.body.gender,
    website: req.body.website,
    profilePictureUrl: req.body.profilePictureUrl,
    userId: req.body.userId
  }
  user.saveInfo(userInfo, res)
})

.put('/', (req, res) => {
  const updatedUser = {
    name: req.body.name,
    username: req.body.username
  }

  let id = req.body.id

  user.update(id, updatedUser, res)
})

.put('/userInfo', (req, res) => {
  const userInfo = {
    biography: req.body.biography,
    phone: req.body.phone,
    gender: req.body.gender,
    website: req.body.website,
    profilePictureUrl: req.body.profilePictureUrl
  }
  let id = req.body.userId

  user.updateInfo(id, userInfo, res)
})

.delete('/:id', (req, res) => {
  let id = req.params.id

  user.delete(id, res)
})

module.exports = router