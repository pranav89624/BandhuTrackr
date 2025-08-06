import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

const PageLayout = ({ children, className = "" }: PageLayoutProps) => {
  return (
    <>
      <Navbar />
      <main id="main-content" className={className}>
        {children}
      </main>
    </>
  );
};

export default PageLayout;
