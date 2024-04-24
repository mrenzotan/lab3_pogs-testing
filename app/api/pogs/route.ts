import { NextResponse } from 'next/server';
import {
  readPogs,
  readPogsByTickerSymbol,
  createPog,
  updatePog,
  deletePog,
} from '@/lib/pogs';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tickerSymbol = url.searchParams.get('tickerSymbol');
  if (tickerSymbol) {
    const existingPogs = await readPogsByTickerSymbol(tickerSymbol);
    return NextResponse.json(existingPogs);
  }
  const pogs = await readPogs();
  return NextResponse.json(pogs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const pog = await createPog(body);
  return NextResponse.json(pog);
}

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing pog ID' }, { status: 400 });
  }
  const body = await request.json();
  const updatedPog = await updatePog({ id: parseInt(id), ...body });
  return NextResponse.json(updatedPog);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing pog ID' }, { status: 400 });
  }
  await deletePog(parseInt(id));
  console.log(`Pog deleted: ${id}`);
  return NextResponse.json({ message: 'Pog deleted' });
}

// New API endpoints for buying and selling Pogs
export async function POST_buy(request: Request) {
  const body = await request.json();
  const { pogId, amount } = body;
  const { user } = useUser()
  const userId = user?.sub;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user: User = await readUser(parseInt(userId)) as User;
    const pog = await readPog(pogId);
    if (!user || !pog) {
      throw new Error('User or Pog not found');
    }

    const newBalance = user.balance - amount * pog.price;
    if (newBalance < 0) {
      throw new Error('Insufficient balance');
    }

    user.balance = newBalance;
    await updateUser(user);

    pog.owners.push(parseInt(userId));
    await updatePog(pog);

    return NextResponse.json({ message: 'Pog bought successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to buy Pog' }, { status: 500 });
  }
}

export async function POST_sell(request: Request) {
  const body = await request.json();
  const { pogId, amount } = body;
  const { user } = useUser()
  const userId = user?.sub;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await readUser(parseInt(userId)) as User;
    const pog = await readPog(pogId);
    if (!user || !pog) {
      throw new Error('User or Pog not found');
    }

    const newBalance = user.balance + amount * pog.price;
    user.balance = newBalance;
    await updateUser(user);

    pog.owners = pog.owners.filter(ownerId => ownerId.toString() !== userId);
    await updatePog(pog);

    return NextResponse.json({ message: 'Pog sold successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to sell Pog' }, { status: 500 });
  }
}