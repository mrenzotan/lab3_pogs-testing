import { NextResponse } from 'next/server';
import {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
} from '@/lib/users';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get('email');
  const users = email ? await getUserByEmail(email) : await getUserByEmail('');
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await createUser(body);
  return NextResponse.json(user);
}

export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }
  const body = await request.json();
  const updatedUser = await updateUser({ id: parseInt(id), ...body });
  return NextResponse.json(updatedUser);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
  }
  await deleteUser(parseInt(id));
  return NextResponse.json({ message: 'User deleted' });
}
