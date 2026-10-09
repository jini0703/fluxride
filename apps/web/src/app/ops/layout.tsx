import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function OpsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="h-16 flex items-center justify-between px-4 border-b bg-background shrink-0">
        <Link href="/" className="flex items-center gap-2 text-purple-500 font-bold text-lg">
          <BarChart3 className="h-5 w-5" />
          <span>Operations Tower</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono bg-purple-500/10 text-purple-500 px-2 py-1 rounded">ADMIN_MODE</span>
          <UserButton />
        </div>
      </header>
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}
