import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'


export async function GET(
    request: Request,
    {params} : {params: {id: string}}
) {
    const awaitedParams = await params;
    const userId = Number(awaitedParams.id)

    try {
        const todos = await prisma.todo.findMany({
            where: {
                userId : userId
            },
            include: {
                user: {
                    select: { firstName: true, nickName: true, email: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        })

        return NextResponse.json(todos)
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
    }
}