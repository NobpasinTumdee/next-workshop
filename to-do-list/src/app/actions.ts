'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';

export async function getUserAll() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                nickName: true,
                email: true,
            },
        });
        return users;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        return [];
    }
}

export async function createUser(formData: FormData) {
    try {
        const firstName = formData.get('first')?.toString().trim()
        const nickName = formData.get('nick')?.toString().trim()
        const email = formData.get('email')?.toString().trim()

        if (!firstName || !nickName || !email) {
            console.error('Missing required fields:', { firstName, nickName, email });
            return;
        }
        const existingUser = await prisma.user.findFirst({
            where: { 
                firstName: String(firstName),
            }
        })
        
        if (existingUser) {
            console.error('User already exists:', existingUser);
            return;
        }

        await prisma.user.create({
            data: {
                firstName: firstName,
                nickName: nickName,
                email: email,
            },
        });
        revalidatePath('/')
    } catch (error) {
        console.error('Failed to create user:', error);
        return;
    }
}