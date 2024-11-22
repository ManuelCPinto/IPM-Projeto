// /app/api/albums/[albumId]/reviews/route.ts

import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
}
