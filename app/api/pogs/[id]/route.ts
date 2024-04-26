import { NextResponse, NextRequest } from 'next/server';
import { readSpecificPog } from '@/lib/pogs';

export async function GET({ params }: { params: { id: string } }) {
  const id = params.id;
  try {
    const pog = await readSpecificPog(parseInt(id));
    return NextResponse.json(pog);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
