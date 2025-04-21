import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req:Request) {

    try {
        const { email, password } = await req.json();

        // check if user exists
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password'},
                {status: 401}
            );
        }

        //check password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: 'Invalid email or password'},
                { status: 401 }
            );
        }

        const token = jwt.sign({ email: user.email, fullName: user.fullName }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
          });
        
        const response = NextResponse.json({ message: 'Login successful' });

        // TOKEN GENERATION HERE JWT or SESSIOIN 
        response.cookies.set({
            name: 'token',
            value: token,
            httpOnly: true,
            maxAge: 3600,
            path: '/main',
          });
        return response;
        /*
        return NextResponse.json(
            {
                message: 'Login successful',
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                },
            },
            { status: 200}
        ); */
    } catch (error) {
        console.error('[Login Error]', error);
        return NextResponse.json(
            { error: 'Internal server error'},
            { status: 500}
        )
    }
    
}