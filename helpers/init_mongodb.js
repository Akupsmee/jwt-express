import mongoose from 'mongoose';

const startDB = () => {
  mongoose
    .connect('mongodb://localhost/auth_tutorial')
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log('Error connecting to MongoDB: ', err);
    });

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
  mongoose.connection.on('error', (err) => {
    console.log('MongoDB error: ', err);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('MongoDB disconnected through app termination');
      process.exit(0);
    });
  });
};

export default startDB;
