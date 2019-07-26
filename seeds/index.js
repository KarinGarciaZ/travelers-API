
const env = require('dotenv')
env.config();

const faker = require('Faker')
const models = require('../src/app/db_config/schema-db')

let data = {
  range: [],
  country: [],
  city: [],
  user: [],
  album: [],
  image: [],
  like: [],
  comment: [],
  userInfo: [],
  follow: []
}

data.range = [
  { name: 'country', medal: 'diamond' },
  { name: 'capital', medal: 'platinum' },
  { name: 'bigCity', medal: 'Gold' },
  { name: 'mediumCity', medal: 'Silver' },
  { name: 'smallCity', medal: 'Bronze' },
]

for (let index = 0; index < 50; index++) {
  let country = {
    name: faker.Address.ukCounty(),
    latitude: faker.Address.latitude(),
    longitude: faker.Address.longitude(),
    rangeId: Math.floor(Math.random() * 4) + 1,
  }
  data.country.push(country)
}

for (let index = 0; index < 1000; index++) {
  let city = {
    name: faker.Address.city(),
    latitude: faker.Address.latitude(),
    longitude: faker.Address.longitude(),
    rangeId: Math.floor(Math.random() * 4) + 1,
    countryId: Math.floor(Math.random() * 49) + 1,
  }
  data.city.push(city)
}

for (let index = 0; index < 100; index++) {
  let user = {
    name: faker.Name.firstName()+' '+faker.Name.lastName(),
    email: faker.Internet.email(),
    username: faker.Internet.userName(),
    password: '123456',
  }
  data.user.push(user)
}

for (let index = 0; index < 100; index++) {
  let userInfo = {
    biography: faker.Lorem.sentence(),
    phone: faker.PhoneNumber.phoneNumber(),
    gender: faker.Lorem.words(1),
    website: faker.Image.imageUrl(),
    profilePictureUrl: faker.Image.imageUrl(),
    userId: index + 1,
  }
  data.userInfo.push(userInfo)
}

for (let index = 0; index < 300; index++) {
  let album = {
    description: faker.Lorem.sentence(),
    userId: Math.floor(Math.random() * 99) + 1,
    cityId: Math.floor(Math.random() * 999) + 1,
  }
  data.album.push(album)
}

for (let index = 0; index < 1000; index++) {
  let image = {
    url: faker.Image.imageUrl(
      Math.floor(Math.random() * 500) + 500, 
      Math.floor(Math.random() * 500) + 500),
    albumId: Math.floor(Math.random() * 299) + 1,
  }
  data.image.push(image)
}

for (let index = 0; index < 1000; index++) {
  let like = {
    userId: Math.floor(Math.random() * 99) + 1,
    albumId: Math.floor(Math.random() * 299) + 1,
  }
  data.like.push(like)
}

for (let index = 0; index < 1000; index++) {
  let comment = {
    text: faker.Lorem.sentence(),
    userId: Math.floor(Math.random() * 99) + 1,
    albumId: Math.floor(Math.random() * 299) + 1,
  }
  data.comment.push(comment)
}

for (let index = 0; index < 1000; index++) {
  let follow = {
    userId: Math.floor(Math.random() * 99) + 1,
    idFollowing: Math.floor(Math.random() * 99) + 1,
  }
  data.follow.push(follow)
}


let fillDB = async () => {
  await models.Range.bulkCreate(data.range)
  await models.Country.bulkCreate(data.country)
  await models.City.bulkCreate(data.city)
  await models.User.bulkCreate(data.user)
  await models.Album.bulkCreate(data.album)
  await models.Image.bulkCreate(data.image)
  await models.Like.bulkCreate(data.like)
  await models.Comment.bulkCreate(data.comment)
  await models.Follow.bulkCreate(data.follow)
  await models.UserInfo.bulkCreate(data.userInfo)
}

fillDB()