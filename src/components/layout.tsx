import Link from "next/link";
import { FcHome } from "react-icons/fc";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header className="flex items-center my-2 justify-evenly">
        <Link href="/">
          <a>
            <FcHome className="w-10 h-10 animate-bouce" />
          </a>
        </Link>
        <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-100">
          Todd Chavez{`'`}s Crazy Ideas!
        </h1>
      </header>
      <main>{children}</main>
      <footer className="flex my-2 justify-evenly ">
        <Link href="/results">
          <a>
            <div className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-100">
              Results
            </div>
          </a>
        </Link>
        <a
          href="https://github.com/makyfj/Todd"
          target="https://github.com/makyfj/Todd"
        >
          <div className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500">
            Source Code
          </div>
        </a>
      </footer>
    </>
  );
};

export default Layout;
