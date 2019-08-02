const env = require('dotenv')
env.config();

const album = require('../app/models/Album/album.model')

it('works with async/await', async (done) => {
  expect.assertions(1);
  const data = await album.getAllPerUser(1);
  expect(data.albums.length).toBeGreaterThan(0);
});