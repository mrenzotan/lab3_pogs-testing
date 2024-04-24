import { NextResponse, NextRequest } from 'next/server';
import { readPogs, createPog, updatePog, deletePog } from '@/lib/pogs';

export async function GET() {
  const pogs = await readPogs();
  return NextResponse.json(pogs);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const pog = await createPog(body);
  return NextResponse.json(pog);
}

export async function UPDATE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing pog ID' }, { status: 400 });
  }
  const body = await request.json();
  const updatedPog = await updatePog({ id: parseInt(id), ...body });
  return NextResponse.json(updatedPog);
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing pog ID' }, { status: 400 });
  }
  await deletePog(parseInt(id));
  return NextResponse.json({ message: 'Pog deleted' });
}
