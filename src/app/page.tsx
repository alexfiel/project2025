import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';

interface DecodedToken {
  email: string;
  fullName: string;
  // Add other fields from your token if needed
}

export default function HomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  let user: DecodedToken | null = null;

  try {
    user = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
  } catch (error) {
    redirect('/login');
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome back, {user.fullName}!</h1>
      <p>Email: {user.email}</p>
      {/* Additional dashboard content */}
    </div>
  );
}
