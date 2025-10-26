import { NextResponse } from 'next/server';

export async function POST() {
  // TODO: convert buyer → seller in database
  return NextResponse.json({ success: true, message: 'You are now a seller!' });
}
