import { createTodo, deleteTodo, getTodos, getUser } from '../actions';

export default async function TodoPage(
    { params }: { params: { id: string } }
) {
    const awaitedParams = await params;
    const todos = await getTodos(awaitedParams.id)
    const UserInfo = await getUser(awaitedParams.id)

    return (
        <>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>📝 Todo List </h1>
                <h1>🎉 Welcome {UserInfo?.firstName}</h1>

                <form action={createTodo} className='todo-form'>
                    <input name="title" placeholder="New Header" />
                    <input name="content" placeholder="New body..." />
                    <input type="hidden" name="userId" value={awaitedParams.id} />
                    <button type="submit">Add</button>
                </form>

                <ul className='todo-list'>
                    {todos.length === 0 ? (
                        <>
                           <h3>Yay! Great job! Your work is done! Go out and touch the grass!</h3>
                           <img src="https://media.tenor.com/Rp0U7bdOhSUAAAAi/anime.gif" alt="gif" width={100} />
                        </>
                    ) : (
                        <>
                            {todos.map((todo, i) => (
                                <li key={i} className='todo-item'>
                                    <div className='todo-content'>
                                        <span className='todo-text'>
                                            <h3 style={{ margin: '0' }}>{i + 1}. {todo.title}</h3>
                                            <p>{todo.content}</p>
                                        </span>
                                    </div>

                                    <form action={deleteTodo} className='todo-delete'>
                                        <input type="hidden" name="id" value={todo.id} />
                                        <button className='clear' type="submit">Done!!!</button>
                                    </form>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>

        </>
    );
}



// | Syntax         | ใช้ทำอะไร                               |
// | -------------- | ---------------------------------------|
// | `[param]`      | รับค่า param จาก URL (`/user/123`)       |
// | `[...param]`   | รับหลาย segment เป็น array (`/a/b/c`)    |
// | `[[...param]]` | แบบ optional (มีหรือไม่มี segment ก็ได้)     |
// | `(group)`      | จัดกลุ่มไฟล์โดยไม่ส่งผลต่อ URL               |
// | `@name`        | สำหรับ parallel route (ขั้นสูง)            |
