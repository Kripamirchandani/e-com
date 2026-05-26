import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Customer', 'Admin'], default: 'Customer' },
  addresses: [AddressSchema]
}, { timestamps: true });


const CartItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 }
});

const WishlistItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }
});

const UserSessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  cart: [CartItemSchema],
  wishlist: [WishlistItemSchema]
}, { timestamps: true });



export const User = mongoose.models.User || mongoose.model('User', UserSchema);