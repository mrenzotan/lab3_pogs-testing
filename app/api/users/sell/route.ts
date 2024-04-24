import { NextResponse } from 'next/server';
import {
  readSpecificUser,
  updateUserBalance,
  updateUserPogs
} from '@/lib/users';
import { readSpecificPog } from '@/lib/pogs';
import { useUser } from '@auth0/nextjs-auth0/client';

export async function POST(request: Request) {
  const body = await request.json();
  const { pogID, amount } = body;

  // Check for user auth
  const { user } = useUser();
  const userID = user?.sub;
  if (!userID) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await readSpecificUser(userID);
    const pog = await readSpecificPog(pogID);
    if (!user || !pog) {
      throw new Error('User or Pog not found');
    }

    const newBalance = user.balance + amount * pog.price;

    await updateUserBalance(user, newBalance);

    await updateUserPogs(user, pogID, "sell");

    return NextResponse.json({ message: 'Pog sold successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to sell Pog' }, { status: 500 });
  }
}
