import { revalidatePath } from 'next/cache';

let todos: { header: string; body: string }[] = [];

export default function TodoPage() {
    async function addTodo(formData: FormData) {
        'use server';
        const newHeader = formData.get('todo-header')?.toString();
        const newBody = formData.get('todo')?.toString();
        if (newBody && newBody.trim() && newHeader && newHeader.trim()) {
            todos.push({ header: newHeader, body: newBody });
        }
        revalidatePath('/todo'); // รีโหลดหน้าใหม่ (fetch ข้อมูลใหม่)
    }

    async function deleteTodo(index: number) {
        'use server';
        todos.splice(index, 1);
        revalidatePath('/todo');
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>📝 Todo List (Server Actions)</h1>

            <form action={addTodo} className='todo-form'>
                <input name="todo-header" placeholder="New Header" />
                <input name="todo" placeholder="New body..." />
                <button type="submit">Add</button>
            </form>

            <ul className='todo-list'>
                {todos.map((todo, i) => (
                    <li key={i} className='todo-item'>
                        <span className='todo-text'>
                            <h3 style={{margin: '0'}}>{i+1}. {todo.header}</h3>
                            <p>{todo.body}</p>
                        </span>
                        <form action={deleteTodo.bind(null, i)}>
                            <button className='clear' type="submit">Done!!!</button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );
}
