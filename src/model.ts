import { Schema } from 'mongoose';
import { mongoose } from './db';

export const schema = new Schema({
  name: String,
});

export const model = mongoose.model('provider', schema);