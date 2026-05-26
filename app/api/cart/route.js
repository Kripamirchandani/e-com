import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { UserSession } from '@/models/UserSession';


function calculateCartTotal(items) {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}


const DEFAULT_USER_ID = "user-session-id-global-999";


export async function GET(req) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || req.headers.get('X-User-Id') || DEFAULT_USER_ID;

    let session = await UserSession.findOne({ userId });
    
    if (!session) {
      session = await UserSession.create({ userId, cart: [], wishlist: [] });
    }
    
    return NextResponse.json(session.cart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const userId = body.userId || DEFAULT_USER_ID;
    const { title, price, image, quantity = 1 } = body;

    let session = await UserSession.findOne({ userId });
    if (!session) {
      session = new UserSession({ userId, cart: [], wishlist: [] });
    }

    const itemIndex = session.cart.findIndex((item) => item.title === title);
    
    if (itemIndex > -1) {
      session.cart[itemIndex].quantity += quantity;
    } else {
      session.cart.push({ title, price, image, quantity });
    }

    await session.save();
    return NextResponse.json({ message: 'Cart updated successfully', cart: session.cart }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(req) {
  try {
    await dbConnect();
    const { userId = DEFAULT_USER_ID, title, quantity } = await req.json();

    const session = await UserSession.findOne({ userId });
    if (!session) return NextResponse.json({ error: 'Cart records not located' }, { status: 404 });

    const itemIndex = session.cart.findIndex((item) => item.title === title);
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        session.cart.splice(itemIndex, 1);
      } else {
        session.cart[itemIndex].quantity = quantity;
      }
      
      await session.save();
      return NextResponse.json({ message: 'Quantity altered', cart: session.cart }, { status: 200 });
    }
    
    return NextResponse.json({ error: 'Product absent from cart matrix' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE: Clean drop single item out of the active user list
 */
export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    const userId = searchParams.get('userId') || DEFAULT_USER_ID;
    const title = searchParams.get('title');

    const session = await UserSession.findOne({ userId });
    if (!session) return NextResponse.json({ error: 'Cart not active' }, { status: 404 });

    session.cart = session.cart.filter((item) => item.title !== title);
    
    await session.save();
    return NextResponse.json({ message: 'Item stripped from operational stack', cart: session.cart }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}