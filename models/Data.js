import { Schema, model } from 'mongoose';

const DataSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('Data', DataSchema);
