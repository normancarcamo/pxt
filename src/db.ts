import _mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();

_mongoose.Promise = Promise;

mongoServer.getUri().then((mongoUri) => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  _mongoose.connect(mongoUri, mongooseOpts);

  _mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(`Cannot stablish connection with mongo database`, e);
      _mongoose.connect(mongoUri, mongooseOpts);
    }
    console.log(e);
  });

  _mongoose.connection.once('open', () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);
  });
});

export const db = mongoServer;
export const mongoose = _mongoose;