import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Order } from '@/lib/models/Order';
import { Cart } from '@/lib/models/Cart';
import { Product } from '@/lib/models/Product';

export async function POST(req) {
  try {
    await connectToDatabase();
    const { userId, shippingAddress } = await req.json();

    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Checkout conversion halted. Empty active cart tracking.' }, { status: 400 });
    }

    const orderItems = [];
    for (const entry of cart.items) {
      const dbProduct = await Product.findById(entry.productId._id);
      if (!dbProduct || dbProduct.stockCount < entry.quantity) {
        return NextResponse.json({ error: `Fulfillment threshold broken for product resource: ${dbProduct?.title || 'Unknown'}` }, { status: 400 });
      }
      
      dbProduct.stockCount -= entry.quantity;
      if (dbProduct.stockCount === 0) {
        dbProduct.status = 'Sold Out';
      }
      await dbProduct.save();

      orderItems.push({
        productId: entry.productId._id,
        title: entry.productId.title,
        price: entry.productId.price,
        quantity: entry.quantity
      });
    }

    const order = await Order.create({
      userId,
      items: orderItems,
      shippingAddress,
      paymentStatus: 'Paid',
      orderStatus: 'Processing',
      totalAmount: cart.totalPrice
    });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    return NextResponse.json({ message: 'Order executed securely', order }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User mapping sequence unverified.' }, { status: 400 });
    }

    const userOrders = await Order.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ orders: userOrders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}