const User = require('../../db_config/schema-db').User
const UserInfo = require('../../db_config/schema-db').UserInfo
const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const userFunctions = {}

userFunctions.getOne = (id, res) => {
  sequelizeConnection.transaction( t => {
    return User.findOne({ 
      where: { id, statusItem: 0 },
      include: [{ model: UserInfo }]
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

userFunctions.saveInfo = ( userInfo, res ) => {
  sequelizeConnection.transaction( t => {
    return UserInfo.create(userInfo)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

module.exports = userFunctions