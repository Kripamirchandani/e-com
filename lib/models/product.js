import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true }
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discountBadge: { type: String }, 
  images: [{ type: String, required: true }],
  category: { type: String, required: true, index: true },
  tags: [{ type: String, index: true }], 
  stockCount: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ['Available', 'Pre-Order', 'Sold Out'], default: 'Available' },
  averageRating: { type: Number, default: 0 },
  reviews: [ReviewSchema]
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);