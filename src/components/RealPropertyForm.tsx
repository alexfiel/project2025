'use client';

import { useState } from 'react';
import { Input } from './ui/input';     
import { Button } from './ui/button';
import { Label } from './ui/label'; 
import { User } from 'lucide-react';

interface RealPropertyFormProps {
    userId: string; 
    fullName: string; 
    email: string;
}


export default function RealPropertyForm({ userId, fullName, email }: RealPropertyFormProps) 
{
    const [form, setForm]= useState({
        ownerName: '',
        lotNumber: '',
        area: '',
        marketValue: '',
    }); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log('HANDLE CHANGES HERE...')
    }; 

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const { ownerName, lotNumber } = form;
        const area = parseFloat(form.area);
        const marketValue = parseFloat(form.marketValue);
      
        if (isNaN(area) || isNaN(marketValue)) {
          alert('Area and Market Value must be valid numbers.');
          return;
        }
      
        try {
          const payload = { ownerName, lotNumber, area, marketValue, userId };
          console.log('Sending payload:', payload);
      
          const res = await fetch('/api/realproperty', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
      
          const result = await res.json();
      
          if (!res.ok) {
            alert(result.error);
            return;
          }
      
          alert('Real property created successfully!');
          setForm({ ownerName: '', lotNumber: '', area: '', marketValue: '' });
        } catch (err) {
          console.error('Submit error:', err);
          alert('Error creating real property. Please try again.');
        }
      };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6">
           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Full Name:</strong> {fullName}</p>
      </div>
            
            <div>
                <Label>Owner Name</Label>
                <Input name='ownerName' value={form.ownerName} onChange={handleChange} required placeholder="Enter owner name" />
            </div>
            <div>
                <Label>Lot Number</Label>
                <Input name='lotNumber' value={form.lotNumber} onChange={handleChange} required placeholder="Enter lot number" />
            </div>
            <div>
                <Label>Area</Label>
                <Input name='area' value={form.area} onChange={handleChange} required placeholder="Enter area" />
            </div>
            <div>
                <Label>Market Value</Label>
                <Input name='marketValue' value={form.marketValue} onChange={handleChange} required placeholder="Enter market value" />
            </div>
            <Button type="submit" className="w-full">Create Real Property</Button>
            <Button type="button" className="w-full mt-4" onClick={() => setForm({ ownerName: '', lotNumber: '', area: '', marketValue: '' })}>Reset</Button>   
        </form>
    )
    
}