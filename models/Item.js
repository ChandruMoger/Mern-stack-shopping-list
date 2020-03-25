import { Schema, model } from 'mongoose';
import { stringify } from 'querystring';

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Item = model('item', ItemSchema);

export default Item;
