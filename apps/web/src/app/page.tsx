import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Map, Zap, Car, Shield, BarChart3, Clock, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { userId } = await auth();
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">FluxRide</span>
          </div>
          
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#dispatch" className="hover:text-foreground transition-colors">Dispatch Intelligence</Link>
            <Link href="#architecture" className="hover:text-foreground transition-colors">Architecture</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            {!userId ? (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button size="sm">Get Started</Button>
                </SignUpButton>
              </>
            ) : (
              <>
                <Link href="/book">
                  <Button variant="ghost" size="sm">Go to App</Button>
                </Link>
                <UserButton />
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 lg:py-32">
          <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-balance">
                Smarter Urban <span className="text-primary">Mobility</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
                Real-time ride-hailing powered by an explainable dispatch intelligence engine. Experience the next generation of transport operations.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Link href="/book">
                  <Button size="lg" className="w-full sm:w-auto gap-2">
                    <MapPin className="h-5 w-5" />
                    Book a Ride
                  </Button>
                </Link>
                <Link href="/ops">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Explore Dispatch Intelligence
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Map Visual (Mockup) */}
            <div className="mt-16 max-w-5xl mx-auto rounded-2xl border bg-card shadow-2xl overflow-hidden aspect-video relative flex items-center justify-center">
               <div className="absolute inset-0 bg-slate-100 dark:bg-slate-900 opacity-50 flex items-center justify-center">
                 {/* Decorative Map Lines */}
                 <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                   <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                     <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                   </pattern>
                   <rect width="100%" height="100%" fill="url(#grid)" />
                 </svg>
               </div>
               
               <div className="relative z-10 text-center">
                 <Map className="h-16 w-16 mx-auto mb-4 text-primary opacity-80" />
                 <p className="text-muted-foreground font-medium">Interactive Map Integration Ready</p>
               </div>
            </div>
          </div>
        </section>

        {/* Portals Section */}
        <section className="py-24 bg-muted/50 border-y">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">Three Purpose-Built Interfaces</h2>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Link href="/book" className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Rider Application</h3>
                <p className="text-muted-foreground mb-4">Book rides instantly. Real-time driver tracking, fair estimates, and seamless payments.</p>
                <span className="text-primary font-medium group-hover:underline">Explore Rider App &rarr;</span>
              </Link>

              <Link href="/driver" className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-accent">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Driver Platform</h3>
                <p className="text-muted-foreground mb-4">Optimized earnings and navigation. See requests, accept rides, and view your ledger.</p>
                <span className="text-accent font-medium group-hover:underline">Explore Driver App &rarr;</span>
              </Link>

              <Link href="/ops" className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-purple-500">
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Operations Tower</h3>
                <p className="text-muted-foreground mb-4">Fleet telemetry, simulated demand scenarios, and algorithm benchmarking in real-time.</p>
                <span className="text-purple-500 font-medium group-hover:underline">Enter Operations &rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section id="dispatch" className="py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Explainable Dispatch Intelligence</h2>
                <p className="text-lg text-muted-foreground mb-8 text-balance">
                  Our routing engine doesn't just match the closest car. It calculates ETAs, balances driver workloads, and explains exactly why a decision was made.
                </p>
                
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Nearest vs. Fastest</h4>
                      <p className="text-sm text-muted-foreground">Compare straightforward geographic radius assignments against real-time routing ETA.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <BarChart3 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Weighted Scoring Engine</h4>
                      <p className="text-sm text-muted-foreground">Accounts for driver idle time, historical reliability, and fairness alongside raw ETA.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="rounded-xl border bg-card p-6 shadow-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <span className="font-medium">Candidate Score Breakdown</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full">Driver D-892</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm"><span>Distance (2.1km)</span><span className="text-primary font-medium">+42.0</span></div>
                    <div className="flex justify-between text-sm"><span>ETA (4 mins)</span><span className="text-primary font-medium">+58.0</span></div>
                    <div className="flex justify-between text-sm"><span>Idle Time (12m)</span><span className="text-accent font-medium">+15.0</span></div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                      <span>Total Score</span>
                      <span>115.0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold">FluxRide</span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            Built as a real-time dispatch intelligence demonstration platform.
          </p>
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
