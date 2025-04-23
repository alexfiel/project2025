import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import MainLayoutClient from '@/app/(dashboard)/main/mainLayout';
import { redirect } from 'next/navigation';

interface DecodedToken {
  email: string;
  fullName: string;
}

export default function MainPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  let user: DecodedToken | null = null;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
  } catch (error) {
    console.error('Invalid token:', error);
    redirect('/login');
  }

  return (
    <MainLayoutClient user={{ email: user!.email, fullName: user!.fullName }} />
  );
}
