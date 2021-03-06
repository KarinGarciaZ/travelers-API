const express = require('express')
const router = express.Router()

const City = require('./City/city.routing')
const Range = require('./Range/range.routing')
const Country = require('./Country/country.routing')
const User = require('./User/user.routing')
const Album = require('./Album/album.routing')
const Image = require('./Image/image.routing')
const Follow = require('./Follow/follow.routing')
const Comment = require('./Comment/comment.routing')
const Like = require('./Like/like.routing')

router.use('/city', City)
router.use('/range', Range)
router.use('/country', Country)
router.use('/user', User)
router.use('/album', Album)
router.use('/image', Image)
router.use('/follow', Follow)
router.use('/comment', Comment)
router.use('/like', Like)

module.exports = router;