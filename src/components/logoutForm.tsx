import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { logout } from "@/actions";

const LogoutForm =() => {
    return (
        <form action={logout}>
        <button className="flex-grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <ArrowLeftCircleIcon className="w-6" />
            <div className="hidden md:block">LogOut</div>
        </button>
    </form>
    )
}

export default LogoutForm