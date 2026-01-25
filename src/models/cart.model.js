import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: []
});

export default mongoose.model('Cart', cartSchema);
