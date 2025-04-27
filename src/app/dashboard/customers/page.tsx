'use server'

import { getSession } from "@/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();
    
  if (!session?.isLoggedIn) {
    redirect("/dashboard/login");
  } else if (!session.isAdmin) {
    redirect("/dashboard/login"); // Redirect user to another page if not admin
  }
  

  return (
    <div>
      <p>Customers {session.username}</p>
      <span>You are a <b>{session.isAdmin ? "Admin": "User"}</b></span>
    </div>
  );
}
