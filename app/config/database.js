const Database = module.exports;

const mongoose = require('mongoose');

const {
  DB_HOST = 'localhost',
  DB_PORT = '27017',
  DB_NAME = 'security',
  DB_USER,
  DB_PASS,
  IS_SRV = false,
  MONGO_URL = 'mongodb://user:pass@mongo_db:27017/admin',
} = process.env;

Database.connect = async () => {
  await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log('Mongo DBConnection Successful!');
  });
};
