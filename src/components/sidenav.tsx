

import Link from "next/link";
import NavLinks from '@/components/nav-links';
import OfficeLogo from "./office-logo";
import { PowerIcon } from "@heroicons/react/24/outline";
import LogoutForm from "./logoutForm";
import { getSession } from "@/actions";

const SideNav = async() => {
    const session = await getSession()
    console.log(session)
    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link className="mb-2 flex h-20 items-end justify-start rounded-md items-center bg-white md:h-40" 
            href="/"
            >
                <div className="w-32 text-white md:w-40">
                    <OfficeLogo />
                </div>

            </Link>
            <div className="flex-grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block">
                    {session.isLoggedIn && <LogoutForm /> }
                </div>
            </div>
    
        </div>
    )
}
export default  SideNav
