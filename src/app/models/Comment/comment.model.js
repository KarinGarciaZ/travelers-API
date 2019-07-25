const User = require('../../db_config/schema-db').User
const UserInfo = require('../../db_config/schema-db').UserInfo
const Comment = require('../../db_config/schema-db').Comment
const Album = require('../../db_config/schema-db').Album

const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const commentFunctions = {}

commentFunctions.getCommentsCountPerAlbum = (albumId, res) => {
  sequelizeConnection.transaction( t => {
    return Comment.count({ where: { albumId, statusItem: 0 } })
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

commentFunctions.getCommentsPerAlbum = (albumId, res) => {
  sequelizeConnection.transaction( t => {
    return Album.findOne({
      where: { id: albumId },
      attributes: [], 
      include: [
        {
          model: Comment,
          where: { statusItem: 0 },
          attributes: ['id', 'text', 'updatedAt'], 
          required: false,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'username'], 
              include: [
                {
                  model: UserInfo,
                  attributes: ['profilePictureUrl']
                }
              ]
            }
          ]
        }
      ]
    })
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

commentFunctions.saveOne = ( comment, res ) => {
  sequelizeConnection.transaction( t => {
    return Comment.create(comment)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

commentFunctions.update = ( commentId, comment, res ) => {
  sequelizeConnection.transaction( t => {
    return Comment.update(comment, {where:{id: commentId}})
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

module.exports = commentFunctions