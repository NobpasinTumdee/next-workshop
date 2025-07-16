'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
// import { NextResponse } from 'next/server'

export async function createTodo(formData: FormData) {
    const title = formData.get('title')?.toString()
    const content = formData.get('content')?.toString()
    const userId = parseInt(formData.get('userId')?.toString() || '')

    if (!title || !content || isNaN(userId)) {
        // redirect('/todo?error=1') // Redirect to the todo page with an error query parameter
        console.error(`Missing required fields: title=${title}, content=${content}, userId=${userId}`)
        return
    }

    try {
        await prisma.todo.create({
            data: {
                title,
                content,
                user: { connect: { id: userId } },
            },
        })
        revalidatePath('/todo') // เพื่อ refresh หน้า
    } catch (error) {
        console.error('Failed to create todo:', error)
        return
    }
}


export async function getTodos(id: string) {
    try {
        const todos = await prisma.todo.findMany({
            include: {
                user: {
                    select: { firstName: true, nickName: true, email: true },
                },
            },
            where: {
                userId: Number(id)
            },
            orderBy: { createdAt: 'desc' },
        })
        return todos
    } catch (error) {
        console.error('Failed to fetch todos:', error)
        return []
    }
}

export async function deleteTodo(formData: FormData) {
    const id = formData.get('id')?.toString()
    try {
        await prisma.todo.delete({
            where: {
                id: Number(id),
            },
        })
        console.log(`Todo with id ${id} deleted successfully`)
        revalidatePath('/todo')
    } catch (error) {
        console.error('Failed to delete todo:', error)
    }
}

export async function getUser(id: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { id: Number(id) }, 
        })
        return user
    } catch (error) {
        console.error('Failed to fetch user:', error)
        return
    }
}