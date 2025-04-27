import { getSession } from "@/actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getSession();

  if (!session?.isLoggedIn) {
    redirect("/dashboard/login");
  }

  return (
    <div>
      <p>Welcome {session.username}</p>
      <span>You are a <b>{session.isAdmin ? "Admin": "User"}</b></span>
    </div>
  );
}
