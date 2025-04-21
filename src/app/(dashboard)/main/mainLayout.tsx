'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Settings, LogOut, User, FileText } from 'lucide-react';
import Image from 'next/image';

interface Props {
  user: {
    email: string;
    fullName: string;
  };
}

export default function MainLayoutClient({ user }: Props) {
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
      });
  
      if (res.ok) {
        router.push('/login');
      } else {
        alert('Logout failed.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Something went wrong.');
    }
  };

  const menuItems = [
    { label: 'Home', href: '/', icon: <Home size={20} /> },
    { label: 'Transaction', href: '/transaction', icon: <FileText size={20} /> },
    { label: 'Profile', href: '/profile', icon: <User size={20} /> },
    { label: 'Settings', href: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 dark:bg-gray-800 border-r dark:border-gray-700 hidden md:flex flex-col fixed h-screen p-4">
        <div className="flex items-center justify-center mb-6">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          {menuItems.map(({ label, href, icon }) => (
            <Link key={label} href={href} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <Button variant="ghost" className="mt-auto flex items-center gap-2" onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </Button>
      </aside>

      {/* Mobile Toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          ☰
        </Button>
      </div>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMobileOpen(false)}>
          <aside className="w-64 bg-gray-100 dark:bg-gray-800 h-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-center mb-6">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
            </div>

            <nav className="flex flex-col gap-2">
              {menuItems.map(({ label, href, icon }) => (
                <Link key={label} href={href} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setIsMobileOpen(false)}>
                  {icon}
                  <span>{label}</span>
                </Link>
              ))}
            </nav>

            <Button variant="ghost" className="mt-6 flex items-center gap-2" onClick={handleLogout}>
              <LogOut size={20} /> Logout
            </Button>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="ml-0 md:ml-64 flex-1 p-6">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome back, {user.fullName}!</h1>
          <p>Email: {user.email}</p>
        </div>
      </main>
    </div>
  );
}
