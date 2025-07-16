import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'


// API route to handle GET and POST requests for todos
export async function GET() {
    try {
        const todos = await prisma.todo.findMany({
            include: {
                user: {
                    select: { firstName: true, nickName: true, email: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        })
        return NextResponse.json(todos)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
    }
}


export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { title, content, userId } = body

        if (!title || !content || !userId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const newTodo = await prisma.todo.create({
            data: {
                title,
                content,
                user: { connect: { id: userId } },
            },
        })

        return NextResponse.json(newTodo, { status: 201 })
    } catch (error) {
        console.error('Error creating todo:', error)
        return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
    }
}