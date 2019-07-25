const User = require('../../db_config/schema-db').User
const UserInfo = require('../../db_config/schema-db').UserInfo
const Like = require('../../db_config/schema-db').Like
const Comment = require('../../db_config/schema-db').Comment
const Follow = require('../../db_config/schema-db').Follow
const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const userFunctions = {}

userFunctions.getOne = (id, res) => {
  sequelizeConnection.transaction( t => {
    return User.findOne({ 
      where: { id, statusItem: 0 },
      attributes: ['id', 'name', 'email', 'username'], 
      include: [
        { 
          model: UserInfo, 
          attributes: ['profilePictureUrl', 'biography', 'website'],
          required: false 
        }
      ]
     })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

userFunctions.saveOne = ( user, res ) => {
  sequelizeConnection.transaction( t => {
    return User.create(user)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

userFunctions.update = ( id, user, res ) => {
  sequelizeConnection.transaction( t => {
    return User.update(user, { where: {id} })
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

userFunctions.saveInfo = ( userInfo, res ) => {
  sequelizeConnection.transaction( t => {
    return UserInfo.create(userInfo)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

userFunctions.updateInfo = ( id, userInfo, res ) => {
  sequelizeConnection.transaction( t => {
    return UserInfo.update(userInfo, { where: {userId: id} })
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

userFunctions.delete = ( id, res ) => {
  sequelizeConnection.transaction( t => {
    return Promise.all([
      User.update({statusItem: 1}, { where: {id, statusItem: 0} }, {transaction: t}),
      Comment.update({statusItem: 1}, { where: {userId: id, statusItem: 0} }, {transaction: t}),
      Like.update({statusItem: 1}, { where: {userId: id, statusItem: 0} }, {transaction: t}),
      Follow.update({statusItem: 1}, { where: { userId: id, statusItem: 0 } }, {transaction: t}),
      Follow.update({statusItem: 1}, { where: { idFollowing: id, statusItem: 0 } }, {transaction: t}),
    ])     
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

module.exports = userFunctions