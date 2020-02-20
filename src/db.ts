import mongoose, { Schema, Model, Document } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

export class Database {
  db: MongoMemoryServer | null = null;
  mongoose: typeof mongoose;
  schemas: {
    Provider: Schema;
    Car: Schema;
  };
  models: {
    provider: Model<Document, {}>,
    car: Model<Document, {}>,
  };

  constructor() {
    this.db = new MongoMemoryServer();
    this.mongoose = mongoose;
    this.mongoose.Promise = Promise;
    this.mongoose.set('useFindAndModify', false);
    this.db.getUri().then((mongoUri: string) => {
      const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    
      this.mongoose.connect(mongoUri, mongooseOpts);
    
      this.mongoose.connection.on('error', (e) => {
        if (e.message.code === 'ETIMEDOUT') {
          console.log(`Cannot stablish connection with mongo database`, e);
          this.mongoose.connect(mongoUri, mongooseOpts);
        }
        console.log(e);
      });
    
      this.mongoose.connection.once('open', () => {
        console.log(`MongoDB successfully connected to ${mongoUri}`);
      });
    });
    this.schemas = {
      Provider: new Schema({
        name: Schema.Types.String
      }, { strict: false }),
      Car: new Schema({
        provider: Schema.Types.String,
        uuid: Schema.Types.String,
        vin: Schema.Types.String,
        make: Schema.Types.String,
        model: Schema.Types.String,
        mileage: Schema.Types.String,
        year: Schema.Types.String,
        price: Schema.Types.String,
        zipCode: Schema.Types.String,
        createdAt: Schema.Types.String,
        updatedAt: Schema.Types.String,
      }, { strict: false }),
    };
    this.models = {
      provider: this.mongoose.model('provider', this.schemas.Provider),
      car: this.mongoose.model('car', this.schemas.Car),
    }
  }
}