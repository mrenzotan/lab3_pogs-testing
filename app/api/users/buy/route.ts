import { NextResponse } from 'next/server';
import {
  readSpecificUser, updateUserBalance, updateUserPogs
} from '@/lib/users';
import { readSpecificPog, updatePog } from '@/lib/pogs';
import { useUser } from '@auth0/nextjs-auth0/client';
import { User } from '@/lib/types';

export async function POST(request: Request) {
  const body = await request.json();
  const { pogId, amount } = body;
  const { user } = useUser()
  const userId = user?.sub;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user: User = await readSpecificUser(parseInt(userId)) as User;
    const pog = await readSpecificPog(pogId);
    if (!user || !pog) {
      throw new Error('User or Pog not found');
    }

    // Validation
    const newBalance = user.balance - amount * pog.price;
    if (newBalance < 0) {
      throw new Error('Insufficient balance');
    }

    user.balance = newBalance;
    await updateUserBalance(user);

    user.ownedPogs.push(pogId);
    await updatePog(pog);

    return NextResponse.json({ message: 'Pog bought successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to buy Pog' }, { status: 500 });
  }
}