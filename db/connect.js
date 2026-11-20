// db/connect.js - W03 - Mongoose version
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const initDb = async (callback) => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Db is already initialized!');
      return callback(null, mongoose.connection.db);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database:', mongoose.connection.db.databaseName);
    callback(null, mongoose.connection.db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (mongoose.connection.readyState !== 1) {
    throw Error('Db not initialized');
  }
  return mongoose.connection.db;
};

module.exports = { initDb, getDb };