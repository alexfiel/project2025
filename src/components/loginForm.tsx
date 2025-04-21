'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


export default function LoginForm() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email:'',
        password: '',
    });

const [showPassword, setShowPassword] = useState(false);
const [errors, setErrors] = useState<{[key: string]: string }>({});
const [isSubmitting, setIsSubmitting] = useState(false);

const handleeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value}));
};

const validate =() => {
    const newErrors: typeof errors ={};
    if (!formData.email) newErrors.email ='Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    return newErrors;
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
    /*
    alert ('Login Form Data:\n' + JSON.stringify(formData, null, 2));
    setIsSubmitting(true);

    setTimeout(() => {
        alert('Login successful!');
        setIsSubmitting(false);
    }, 1000); 
    */
   try {
    const res = await fetch('/api/login',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify(formData),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || 'Login failed');
    }else {
      alert('Login successful!');
      router.push('/main')

      // redirect
      //revalidatePath("/app/dashboard");
    }
   } catch (err) {
    alert('Something went wrong');
   } finally {
    setIsSubmitting(false);
   }
};

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-md"
          />
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleeChange}
              />
              {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleeChange}
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-500"
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Submit */}
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}