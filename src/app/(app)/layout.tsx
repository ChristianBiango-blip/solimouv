import MobileNav from "../components/MobileNav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <MobileNav />
      <main className="pt-20">{children}</main>
    </div>
  );
}
