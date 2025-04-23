import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import RealPropertyForm from '@/components/RealPropertyForm';
import { Redirect } from 'next';

export default async function TransactionPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return <p>Please log in</p>; // or redirect
    redirect('/login'); // Redirect to login page if token is not present
  }

  let userId = '';
  let fullName = '';
  let email = '';
  // Decode the JWT token to get userId, fullName, and email


  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!); // Make sure JWT_SECRET is in your .env
    userId = decoded.userId; // adjust depending on your token payload
    fullName = decoded.fullName; // adjust depending on your token payload
    email = decoded.email; // adjust depending on your token payload  
    console.log("Decoded Token:", decoded);
  } catch (error) {
    console.error('JWT decode error:', error);
    return <p>Invalid token</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Real Property Entry</h1>
      

    <RealPropertyForm 
      userId={userId} 
      fullName={fullName}
      email={email}  />
    </div>
  );
}