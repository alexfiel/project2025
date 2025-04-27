import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/components/fonts';

export default function OfficeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <img className="h-full w-full"
          src="/logo.png"
          alt="Logo"
          
      />
      
    </div>
  );
}
