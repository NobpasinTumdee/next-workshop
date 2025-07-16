import Link from "next/link";
import './globals.css';
import {getUserAll} from '@/app/actions';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const users = await getUserAll();
  return (
    <html lang="en">
      <body>
        <main>

          <nav className="navbar">
            <h2>To-Do List App</h2>
            <div className="menu-navs">
              <Link className="menu-nav" href="/">Home</Link>
              {users.map((user) => (
                <Link key={user.id} className="menu-nav" href={`/todo/${user.id}`}>
                  {user.firstName}
                </Link>
              ))}
            </div>
          </nav>
          <div style={{height: '70px'}}></div>

          {children}

        </main>
      </body>
    </html>
  );
}