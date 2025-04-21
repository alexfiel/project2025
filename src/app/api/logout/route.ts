import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' });

  // Properly remove the cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    path: '/main',
    expires: new Date(0), // Expire immediately
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  return response;
}
