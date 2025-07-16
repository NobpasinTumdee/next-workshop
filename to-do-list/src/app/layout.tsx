import Link from "next/link";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>

          <nav className="navbar">
            <h2>To-Do List App</h2>
            <div className="menu-navs">
              <Link className="menu-nav" href="/">Home</Link>
              <Link className="menu-nav" href="/todo">To-Do List</Link>
              <Link className="menu-nav" href={`/todo/${1}/Bob`}>User Bob</Link>
              <Link className="menu-nav" href={`/todo/${2}/Alice`}>User Alice</Link>
            </div>
          </nav>
          <div style={{height: '70px'}}></div>

          {children}

        </main>
      </body>
    </html>
  );
}