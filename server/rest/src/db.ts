const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./common/config');

module.exports = async (): Promise<void> => {
  try {
    mongoose.connect(
      MONGO_CONNECTION_STRING,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      () => console.log('Mongoose is connected')
    );
  } catch (e) {
    console.log('Mongoose was unable to connect', e);
  }

  const dbConnection = mongoose.connection;
  dbConnection.on('error', (err) => console.log(`Connection error ${err}`));
  dbConnection.once('open', () => console.log('Connected to DB!'));
};
