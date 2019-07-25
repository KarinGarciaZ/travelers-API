const User = require('../../db_config/schema-db').User
const UserInfo = require('../../db_config/schema-db').UserInfo
const Like = require('../../db_config/schema-db').Like
const Album = require('../../db_config/schema-db').Album

const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const likeFunctions = {}

likeFunctions.getLikesCountPerAlbum = (albumId, res) => {
  sequelizeConnection.transaction( t => {
    return Like.count({ where: { albumId, statusItem: 0 } })
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

likeFunctions.getLikesPerAlbum = (albumId, res) => {
  sequelizeConnection.transaction( t => {
    return Album.findOne({
      where: { id: albumId },
      attributes: [], 
      include: [
        {
          model: Like,
          required: false,
          where: { statusItem: 0 },
          attributes: ['id'], 
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

likeFunctions.validateIfLikeExists = (userId, albumId) => {
  return sequelizeConnection.transaction( t => {
    return Like.findOne({where: {
      albumId,
      userId
    }})
  })
  .then(data => data)
  .catch(err => err)   
}

likeFunctions.saveOne = ( like, res ) => {

  likeFunctions.validateIfLikeExists(like.userId, like.albumId)
  .then( likeResp => {
    sequelizeConnection.transaction( t => {
      if( !likeResp )
        return Like.create(like)
      
      if ( likeResp.dataValues.statusItem )
        return Like.update({statusItem: 0}, {where: {id: likeResp.dataValues.id}})

      return Like.update({statusItem: 1}, {where: {id: likeResp.dataValues.id}})
    })
    .then(data => responseMW(null, res, data, 201))
    .catch(err => responseMW(err, res)) 
  })
  .catch(err => responseMW(err, res))  
     
}

module.exports = likeFunctions