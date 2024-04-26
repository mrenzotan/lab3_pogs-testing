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
