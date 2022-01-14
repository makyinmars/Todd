import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen">
      <header>
        <h1 className="text-center text-3xl font-bold py-2">
          Todd Chavez{`'`}s Crazy Ideas!
        </h1>
      </header>
      <main>{children}</main>
      <footer className="flex justify-evenly w-full py-2 font-bold text-xl">
        <p>Results</p>
        <p>Source Code</p>
        <p>Github</p>
      </footer>
    </div>
  );
};

export default Layout;
