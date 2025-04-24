'use client';

import { useEffect, useState } from 'react';

interface RealPropertyFormProps {
    userId: string;
    fullName: string;
    email: string;
  }

interface RealProperty{
    id: string;
    ownerName: string;
    lotNumber: string;
    area: number;
    marketValue: number;
    userId: string;
}

export function RealPropertyClient({ userId, fullName, email }: RealPropertyFormProps) {
    const [properties, setProperties] = useState<RealProperty[]>([]);
    const [form, setForm] = useState<Partial<RealProperty>>({});
    const [filter, setFilter] = useState('');
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetch('/api/realproperty');
        const data = await res.json();
        setProperties(data);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => (
            { ...prev, [name]: name === 'area' || 
                name === 'marketValue' ? parseFloat(value) : value }));
            };
        
            const handleSubmit = async () => {
                const method = editingId ? 'PUT' : 'POST';
                const url = editingId ? `/api/realproperty/${editingId}` : '/api/realproperty';
              
                const res = await fetch(url, {
                  method,
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ ...form, userId }),
                });
              
                if (res.ok) {
                  await fetchData();
                  setForm({});
                  setEditingId(null);
                }
              };

            const handleEdit = (item: RealProperty) => {
                setForm(item);
                setEditingId(item.id);
            };

            const filtered = properties.filter((p) =>
                p.ownerName.toLowerCase().includes(filter.toLowerCase()) ||
                p.lotNumber.toLowerCase().includes(filter.toLowerCase())
            );

            return (
                <div className="p-6">
                    <div className="mb-4">
                        <p><strong>User ID:</strong> {userId}</p>
                        <p><strong>Full Name:</strong> {fullName}</p>
                        <p><strong>Email:</strong> {email}</p>
                    </div>

                  <h2 className="text-xl font-bold mb-4">Real Property Management</h2>
            
                  <div className="mb-4 space-y-2">
                    <input name="ownerName" placeholder="Owner's Name" value={form.ownerName || ''} onChange={handleChange} className="border p-2 w-full" />
                    <input name="lotNumber" placeholder="Lot Number" value={form.lotNumber || ''} onChange={handleChange} className="border p-2 w-full" />
                    <input name="area" type="number" placeholder="Area (sqm)" value={form.area || ''} onChange={handleChange} className="border p-2 w-full" />
                    <input name="marketValue" type="number" placeholder="Market Value" value={form.marketValue || ''} onChange={handleChange} className="border p-2 w-full" />
                    <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Create'}</button>
                  </div>
            
                  <input
                    type="text"
                    placeholder="Filter by Owner or Lot #"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="border p-2 w-full mb-4"
                  />
            
                  <div className="overflow-x-auto">
                    <table className="w-full border">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="p-2 border">Owner</th>
                          <th className="p-2 border">Lot #</th>
                          <th className="p-2 border">Area</th>
                          <th className="p-2 border">Market Value</th>
                          <th className="p-2 border">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((p) => (
                          <tr key={p.id}>
                            <td className="p-2 border">{p.ownerName}</td>
                            <td className="p-2 border">{p.lotNumber}</td>
                            <td className="p-2 border">{p.area}</td>
                            <td className="p-2 border">{p.marketValue}</td>
                            <td className="p-2 border">
                              <button className="text-blue-600" onClick={() => handleEdit(p)}>Edit</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
}