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
              <Link className="menu-nav" href="/todo">SOMETING</Link>
              <Link className="menu-nav" href="/todo">SOMETING</Link>

            </div>
          </nav>

          {children}
        </main>
      </body>
    </html>
  );
}