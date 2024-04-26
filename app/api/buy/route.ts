import { NextResponse, NextRequest } from 'next/server';
import {
  updateUserBalance, updateUserPogs
} from '@/lib/users';

export async function POST(request: NextRequest, response: NextResponse) {
  const body = await request.json();
  const { pogID, newBalance, user } = body;

  if (!pogID || !newBalance || !user) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const updatedBalance = await updateUserBalance(user, newBalance);
    await updateUserPogs(user, pogID, 'buy');

    return NextResponse.json({ message: 'POG bought successfully', balance: updatedBalance }, { status: 200 });
  } catch (error) {
    console.error('Error buying POG:', error);
    return NextResponse.json({ error: 'Failed to buy POG' }, { status: 500 });
  }
}