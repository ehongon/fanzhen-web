import { MainLayout } from "@/components/layout/main-layout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
        {children}
      </div>
    </MainLayout>
  );
}
