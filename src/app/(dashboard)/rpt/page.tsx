import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { RealPropertyClient } from '@/components/RealPropertyClient';

interface DecodedToken {
    userId: string;
  email: string;
  fullName: string;
}

export default function RptManagementPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  let user: DecodedToken | null = null;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    console.log("Decoded Token:", user);

  } catch (error) {
    console.error('Invalid token:', error);
    redirect('/login');
  }
  
  if (!user || !user.email || !user.fullName) {
    redirect('/login');
  }
  
  return (
    <RealPropertyClient
      userId={user.email} // or actual userId if available
      fullName={user.fullName}
      email={user.email}
    />
  );
}
