import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { currentPassword, newPassword } = body;

  // Dummy validation
  if (!currentPassword || !newPassword) {
    return NextResponse.json({ success: false, message: 'Missing fields' });
  }

  // TODO: check current password + update in DB
  return NextResponse.json({ success: true, message: 'Password changed successfully!' });
}
