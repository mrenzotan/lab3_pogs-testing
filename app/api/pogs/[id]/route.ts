import { NextRequest, NextResponse } from 'next/server'
import { readSpecificPog } from '@/lib/pogs'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop()
  if (typeof id === 'string') {
    try {
      const pog = await readSpecificPog(parseInt(id))
      return NextResponse.json(pog)
    } catch (error) {
      console.error(error)
      return NextResponse.error()
    }
  } else {
    return NextResponse.error()
  }
}
