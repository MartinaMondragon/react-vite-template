import type { ReactNode } from "react";
import { Header } from "./Header";

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="container flex-1 py-6">{children}</main>
      <footer className="border-t py-4">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME || "Frontend Template"}
        </div>
      </footer>
    </div>
  );
}
