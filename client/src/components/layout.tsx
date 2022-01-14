import React from "react";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/solid";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen">
      <header>
        <div className="flex gap-3 my-6 justify-center">
          <div>
            <Link href="/">
              <a>
                <HomeIcon className="h-9 w-9 text-slate-200" />
              </a>
            </Link>
          </div>
          <h1 className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-500 to-slate-100">
            Todd Chavez{`'`}s Crazy Ideas!
          </h1>
        </div>
      </header>
      <main>{children}</main>
      <footer className="flex justify-evenly w-full py-2 font-bold text-xl">
        <Link href="/results">Results</Link>
        <p>Source Code</p>
        <p>Github</p>
      </footer>
    </div>
  );
};

export default Layout;
