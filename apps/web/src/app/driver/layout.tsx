import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Zap, Shield } from "lucide-react";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="h-16 flex items-center justify-between px-4 border-b bg-background shrink-0">
        <Link href="/" className="flex items-center gap-2 text-accent font-bold text-lg">
          <Shield className="h-5 w-5" />
          <span>FluxRide Driver</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/driver/ledger" className="text-sm text-muted-foreground hover:text-foreground">Earnings</Link>
          <UserButton />
        </div>
      </header>
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}
