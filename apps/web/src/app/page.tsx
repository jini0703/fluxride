import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          FluxRide
        </h1>
        <p className="text-xl text-slate-400">
          Real-Time Ride-Hailing & Dispatch Intelligence Platform.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          <Link href="/book" className="block p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500 transition-colors">
            <h2 className="text-2xl font-semibold mb-2 text-cyan-400">Rider App</h2>
            <p className="text-slate-400">Book a ride, track your driver, and view history.</p>
          </Link>
          
          <Link href="/driver" className="block p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-lime-500 transition-colors">
            <h2 className="text-2xl font-semibold mb-2 text-lime-400">Driver App</h2>
            <p className="text-slate-400">Accept requests, navigate, and manage your earnings.</p>
          </Link>
          
          <Link href="/ops" className="block p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-purple-500 transition-colors">
            <h2 className="text-2xl font-semibold mb-2 text-purple-400">Control Tower</h2>
            <p className="text-slate-400">Monitor fleet, simulate demand, and test algorithms.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
