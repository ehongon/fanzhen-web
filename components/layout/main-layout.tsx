import Header from "./header";
import Footer from "./footer";
import MobileNav from "./mobile-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-16 sm:pb-0">{children}</main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export { MainLayout };
