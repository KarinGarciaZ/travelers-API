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
      attributes: [], 
      include: [
        { 
          model: User, 
          attributes: ['id', 'name', 'username'], 
          required: false,
          include: [
            {
              model: UserInfo,
              attributes: ['profilePictureUrl'], 
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
    return Follow.findAll(
      {
        where: { userId: id, statusItem: 0 },
        attributes: ['idFollowing'], 
      }, {transaction: t}
    )
    .then( follows => {
      if( !follows.length )
        return []

      let arrayUsers = []
      arrayUsers = follows.map( follow => {

        return User.findOne(
          {
            where: { id: follow.idFollowing, statusItem: 0 },
            attributes: ['id', 'name', 'username'], 
            include: [
              {
                model: UserInfo,
                attributes: ['profilePictureUrl'], 
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

followFunctions.validateIfFollowExists = (userId, idFollowing) => {
  return sequelizeConnection.transaction( t => {
    return Follow.findOne({where: {
      idFollowing,
      userId
    }})
  })
  .then(data => data)
  .catch(err => err)   
}

followFunctions.saveOne = ( follow, res ) => {   
  followFunctions.validateIfFollowExists(follow.userId, follow.idFollowing)
  .then( followResp => {
    sequelizeConnection.transaction( t => {
      if( !followResp )
        return Follow.create(follow)
      
      if ( followResp.dataValues.statusItem )
        return Follow.update({statusItem: 0}, {where: {id: followResp.dataValues.id}})

      return Follow.update({statusItem: 1}, {where: {id: followResp.dataValues.id}})
    })
    .then(data => responseMW(null, res, data, 201))
    .catch(err => responseMW(err, res)) 
  })
  .catch(err => responseMW(err, res)) 
}

module.exports = followFunctions