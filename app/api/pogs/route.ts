import { NextResponse } from 'next/server';
import { readPogs, createPog, updatePog, deletePog, readPog } from '@/lib/pogs';
import { readUser, updateUser } from '@/lib/users';
import { useUser } from '@auth0/nextjs-auth0/client';
import { User } from '@/lib/types';

export async function GET() {
  const pogs = readPogs();
  return NextResponse.json(pogs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const pog = await createPog(body);
  return NextResponse.json(pog);
}

export async function UPDATE(request: Request) {
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