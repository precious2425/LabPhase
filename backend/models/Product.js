import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    stock: { type: Number, default: 0, min: 0 },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
