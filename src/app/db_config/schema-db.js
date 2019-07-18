const Sequelize = require('sequelize')
const sequelize = require('./connection')

/*-----------CREATING MODELS----------- */


const City = sequelize.define('cities', {
  name: Sequelize.STRING,
  latitude: Sequelize.DECIMAL(9, 6),
  longitude: Sequelize.DECIMAL(9, 6),
  statusItem: Sequelize.INTEGER
})

const Country = sequelize.define('countries', {
  name: Sequelize.STRING,
  latitude: Sequelize.DECIMAL(9, 6),
  longitude: Sequelize.DECIMAL(9, 6),
  statusItem: Sequelize.INTEGER
})

const Range = sequelize.define('ranges', {
  name: Sequelize.STRING,
  medal: Sequelize.STRING,
  statusItem: Sequelize.INTEGER
})

const Album = sequelize.define('albums', {
  imagesNumber: Sequelize.INTEGER,
  statusItem: Sequelize.INTEGER
})

const Image = sequelize.define('images', {
  url: Sequelize.STRING,
  statusItem: Sequelize.INTEGER
})

const Like = sequelize.define('likes', {
  statusItem: Sequelize.INTEGER
})

const Comment = sequelize.define('comments', {
  text: Sequelize.STRING,
  statusItem: Sequelize.INTEGER
})

const User = sequelize.define('users', {
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: { isEmail: true },
    unique: true
  }, 
  username: {
    type: Sequelize.STRING,
    unique: false
  }, 
  password: Sequelize.STRING,
  statusItem: Sequelize.INTEGER
})

const UserInfo = sequelize.define('userinfo', {
  biography: Sequelize.STRING,
  phone: Sequelize.STRING,
  gender: Sequelize.STRING,
  website: Sequelize.STRING
})

const Follow = sequelize.define('follows', {
  idFollowing: Sequelize.INTEGER,
  statusItem: Sequelize.INTEGER
})

/*-----------CREATING RELATIONS----------- */

Range.hasMany(Country)
Range.hasMany(City)

City.belongsTo(Range)
City.belongsTo(Country)
City.hasMany(Album)

Country.belongsTo(Range)
Country.hasMany(City)

Album.belongsTo(User)
Album.belongsTo(City)
Album.hasMany(Like)
Album.hasMany(Image)
Album.hasMany(Comment)

Image.belongsTo(Album)

Like.belongsTo(User)
Like.belongsTo(Album)

Comment.belongsTo(User)
Comment.belongsTo(Album)

User.hasMany(Album)
User.hasMany(Like)
User.hasMany(Comment)
User.hasMany(Follow)
User.hasOne(UserInfo)

UserInfo.belongsTo(User)

Follow.belongsTo(User)


/*--GENERETE TABLES AND RELATIONS IF THESE DOESN'T EXIST--*/

sequelize.sync(/*{force: true}*/)
.then( () => console.log('DATABASE READY TO WORK'))
.catch( error => console.log('ERROR CONNECTING TO THE DATABASE: --->', error))


module.exports = { City, Range, Country }