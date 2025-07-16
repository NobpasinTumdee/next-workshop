import { createUser } from "./actions";
import AOSInitializer from '@/lib/AOSInitializer';

export default function Page() {
  return (
    <>
      <AOSInitializer />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Welcome to my to do list</h1>
        <p>This is a simple app to manage your tasks.</p>
        <p>Feel free to add, edit, or delete tasks as you wish.</p>
        <p>Enjoy!</p>

        <div className="group-create-user" data-aos="fade-down">
          <form action={createUser} className="create-user-form">
            <h1>Create User</h1>
            <input name="first" placeholder="First Name" required />
            <input name="nick" placeholder="Nick Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit" className="Btn">Create User</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
