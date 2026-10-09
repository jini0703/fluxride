import { MapProvider } from "@/components/MapProvider";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="h-16 flex items-center justify-between px-4 border-b bg-background shrink-0">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-lg">
          <Zap className="h-5 w-5" />
          <span>FluxRide</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/history" className="text-sm text-muted-foreground hover:text-foreground">History</Link>
          <UserButton />
        </div>
      </header>
      <main className="flex-1 relative flex flex-col md:flex-row overflow-hidden">
        <MapProvider>
          {children}
        </MapProvider>
      </main>
    </div>
  );
}
