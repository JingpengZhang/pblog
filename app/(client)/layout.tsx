import React from "react";
import Navigation from "../ui/common/navigation";
import Footer from "../ui/common/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="flex-grow">{children}</main>
      <Footer />
    </>
  );
}
