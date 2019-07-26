const Sequelize = require('sequelize')

const Album = require('../../db_config/schema-db').Album
const Image = require('../../db_config/schema-db').Image
const User = require('../../db_config/schema-db').User
const UserInfo = require('../../db_config/schema-db').UserInfo
const City = require('../../db_config/schema-db').City
const Comment = require('../../db_config/schema-db').Comment
const Like = require('../../db_config/schema-db').Like
const Range = require('../../db_config/schema-db').Range

const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const albumFunctions = {}

albumFunctions.getAllPerUser = (id, res) => {
  sequelizeConnection.transaction( t => {
    return User.findOne({ 
      where: { id, statusItem: 0 },
      attributes: ['id', 'name', 'email', 'username'],      
      order: [ [Album, 'id', 'desc'] ],
      include: [
        { 
          model: UserInfo, 
          attributes: ['profilePictureUrl', 'biography', 'website'],
          required: false 
        },        
        {
          model: Album,
          attributes: ['id', 'description', 'updatedAt'],
          required: false,
          include: [
            { 
              model: City,
              attributes: ['id', 'name'],
              include:[
                {
                  model: Range,
                  attributes: ['id', 'medal']
                }
              ]
            },
            { 
              model: Image,
              attributes: ['url'],
              where: { statusItem: 0 },
            },
            { 
              model: Like,
              attributes: ['id'],
              required: false,
              where: { statusItem: 0 },
            },
            { 
              model: Comment,
              attributes: ['id'],
              required: false,
              where: { statusItem: 0 },
            },
          ]
        }
      ]
    })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

albumFunctions.getOne = (id, res) => {
  sequelizeConnection.transaction( t => {
    return Album.findOne({ 
      where: { id, statusItem: 0 },
      attributes: ['id', 'description', 'updatedAt'],
      include: [
        { 
          model: City,          
          attributes: ['id', 'name'],
          include:[
            {
              model: Range,
              attributes: ['id', 'medal']
            }
          ]
        },
        { 
          model: User,
          attributes: ['id', 'name', 'username'],
          include: [
            {
              model: UserInfo,
              attributes: ['profilePictureUrl'],
            }
          ]
        },
        { 
          model: Image,
          attributes: ['url'],
          where: { statusItem: 0 },
        },
        { 
          model: Like,          
          attributes: ['id'],
          required: false,
          where: { statusItem: 0 },
        },
        { 
          model: Comment,
          attributes: ['id'],
          required: false,
          where: { statusItem: 0 },
        },
      ]
     })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

albumFunctions.getCountImages = id => {
  sequelizeConnection.transaction( t => {
    return Image.count({ where: { statusItem: 0, albumId: id } })
  })
  .then(data => data)
  .catch(err => err)    
}

albumFunctions.validateIfAlbumExists = (userId, cityId) => {
  return sequelizeConnection.transaction( t => {
    return Album.findOne({where: {
      statusItem: 0,
      cityId,
      userId
    }})
  })
  .then(data => data)
  .catch(err => err)   
}

albumFunctions.saveOne = ( album, res ) => {
  albumFunctions.validateIfAlbumExists(album.userId, album.cityId)
  .then( resp => {
    if(resp)
      responseMW('album exists.', res)
    else {
      sequelizeConnection.transaction( t => {
        return Album.create(album)
      })
      .then(data => responseMW(null, res, data, 201))
      .catch(err => responseMW(err, res))  
    }    
  })
  .catch(err => responseMW(err, res))  
}

albumFunctions.update = ( id, album, res ) => {
  sequelizeConnection.transaction( t => {
    return Album.update(album, { where: {id} })
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))   
}

module.exports = albumFunctions