'use client';

import { useState } from "react";
import { Input} from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff} from 'lucide-react';

export default function SignupForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
    });

    const[showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value}));
        setErrors(prev => ({ ...prev, [name]: ''}));
    };

    const validate =() => {
        const newErrors: typeof errors = {};
        if (!formData.fullName) newErrors.fullName ='Full name is required.' ;
        if (!formData.password) newErrors.password ='Password is required.';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters. ';
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        
        /*
        // simulate submission delay

        setTimeout(()=> {
            alert('Signup Success\n' + JSON.stringify(formData, null, 2));
            setIsSubmitting(false);
        }, 1500);
        */
       try {
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
        });

        const result = await res.json();

        if (!res.ok) {
            alert(result.error || 'Signup failed');
        } else {
            alert('Signup successful!');
            setFormData({fullName: '', email: '', password: ''});
        }
       } catch (err) {
        alert('Something went wrong.');
       } finally {
        setIsSubmitting(false);
       }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-md shadow-xl rounded-2xl">
                <CardHeader className="flex flex-col items-center gap-2">
                    <img 
                        src="/logo.png"
                        alt="Logo"
                        className="h-30 w-auto"
                    />
                    <CardTitle className="text-2xl text-center">Create an Account </CardTitle>
                </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Juan Dela Cruz"
                            value={formData.fullName}
                            onChange={handleeChange}
                        />
                        {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* EMAIL */}
                    <div>
                    <Label htmlFor="email">Email</Label>
                        <Input 
                            id="email"
                            name="email"
                            type="email"
                            placeholder="JuanDelaCruz@mail.com"
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
                            type="password"
                            placeholder="......"
                            value={formData.password}
                            onChange={handleeChange}
                        />
                        <button
                            type="button"
                            className="absolute top-2 right-2 text-gray-500"
                            onClick={() => setShowPassword(prev => !prev)}
                        >
                            {showPassword ? <EyeOff size={18}/>: <Eye size={18} />}

                        </button>
                    </div>
                        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                    </div>

                    {/* Submit */}
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating account...' : 'Sign Up'}
                    </Button>
                </form>
            </CardContent>
        </Card>

        </div>
    )
}