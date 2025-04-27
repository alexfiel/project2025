"use server"

import {sessionOptions, SessionData, defaultSession } from "@/lib";
import { error } from "console";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

let username ="Alex"
let isAdmin = false

export const getSession = async () => {
    const cookiStore = await cookies();
    const session = await getIronSession<SessionData>(cookiStore, sessionOptions);

    if (!session.isLoggedIn){
        session.isLoggedIn = defaultSession.isLoggedIn;
    }

    return session;
  };


export const login = async (prevState:{error:undefined | string },formData:FormData) =>{
    const session = await getSession()
       
    const formUsername = formData.get("username") as string
    const formPassword = formData.get("password") as string 

    // check user inthe db
    //const user = await db.getUser({username, password})

    if(formUsername !== username ) {
        return {error:"Wrong Credentials!"}
    }

    session.userId='101'
    session.username=formUsername;
    session.isAdmin = isAdmin;
    session.isLoggedIn = true;

    await session.save();
    redirect("/dashboard");
};


export const logout = async ()=>{
    const session = await getSession();
    session.destroy();
    redirect("/dashboard");
}