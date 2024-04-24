import { NextResponse, NextRequest } from 'next/server';
import {
  readSpecificUser, updateUserBalance, updateUserPogs
} from '@/lib/users';
import { readSpecificPog } from '@/lib/pogs';
import { useUser } from '@auth0/nextjs-auth0/client';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { pogID, amount } = body;

  // Check for user auth
  const { user } = useUser()
  const userID = user?.sub;
  if (!userID) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await readSpecificUser((userID));
    const pog = await readSpecificPog(pogID);
    if (!user || !pog) {
      throw new Error('User or Pog not found');
    }

    // Validation
    const newBalance = user.balance - amount * pog.price;
    if (newBalance < 0) {
      throw new Error('Insufficient balance');
    }

    await updateUserBalance(user, newBalance);

    await updateUserPogs(user, pogID, "buy");

    return NextResponse.json({ message: 'Pog bought successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to buy Pog' }, { status: 500 });
  }
}