const Follow = require('../../db_config/schema-db').Follow
const User = require('../../db_config/schema-db').User
const UserInfo = require('../../db_config/schema-db').UserInfo

const responseMW = require('../../middlewares/response')
const sequelizeConnection = require('../../db_config/connection')

const followFunctions = {}

followFunctions.getAllFollowersPerUser = (id, res) => {
  sequelizeConnection.transaction( t => {
    return Follow.findAll({ 
      where: { idFollowing: id, statusItem: 0 },
      include: [
        { 
          model: User, 
          required: false,
          include: [
            {
              model: UserInfo,
              required: false
            }
          ]
        },  
      ]
    })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

followFunctions.getAllFollowingPerUser = (id, res) => {
  sequelizeConnection.transaction( t => {
    return Follow.findAll({where: { userId: id, statusItem: 0 }}, {transaction: t})
    .then( follows => {
      if( !follows.length )
        return

      let arrayUsers = []
      arrayUsers = follows.map( follow => {

        return User.findOne(
          {
            where: { id: follow.idFollowing, statusItem: 0 },
            include: [
              {
                model: UserInfo,
                required: false
              },  
            ]
          }
          ,{transaction: t}
        )

      })

      return Promise.all(arrayUsers)
    })
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

followFunctions.getAllFollowersCountPerUser = (id, res) => {
  sequelizeConnection.transaction( t => {
    return Follow.count({ where: { idFollowing: id, statusItem: 0 }})
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

followFunctions.getAllFollowingCountPerUser = (id, res) => {
  sequelizeConnection.transaction( t => {
    return Follow.count({where: { userId: id, statusItem: 0 }})    
  })
  .then(resp => responseMW(null, res, resp, 200 ))
  .catch(err => responseMW(err, res))  
}

followFunctions.saveOne = ( follow, res ) => {
  sequelizeConnection.transaction( t => {
    return Follow.create(follow)
  })
  .then(data => responseMW(null, res, data, 201))
  .catch(err => responseMW(err, res))    
}

module.exports = followFunctions