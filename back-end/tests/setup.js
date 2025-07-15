const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo;

jest.setTimeout(30000); // ⏱️ Fix timeout errors

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongo) await mongo.stop(); // ✅ check if mongo exists before stopping
});
