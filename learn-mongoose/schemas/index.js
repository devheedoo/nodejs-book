const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://Heedo:1234@localhost:27017/admin', {
      dbName: 'nodejs'
    }, (error) => {
      if (error) {
        console.log('MongoDB connection ERROR:', error);
      } else {
        console.log('MongoDB connection success.');
      }
    });
  }
  connect();

  mongoose.connection.on('error', (error) => {
    console.log('MONGODB CONNECTION ERROR:', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB is disconnected. Reconnecting...');
    connect();
  });

  require('./user');
  require('./comment');
}