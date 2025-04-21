import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { fullName, email, password} = await req.json();

        // Check for existing user
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already exists.' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const user = await prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
            
            },
        });

        return NextResponse.json(
            { message: 'Signup successful', user },
            { status: 201 }
        );
    } catch (error) {
        console.error('[Signup Error]', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
