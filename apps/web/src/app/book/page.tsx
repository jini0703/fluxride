export default function BookRide() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col p-8">
      <h1 className="text-3xl font-bold mb-8 text-cyan-400">Book a Ride</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Pickup Location</label>
            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-50" placeholder="Enter pickup location" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Destination</label>
            <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-50" placeholder="Enter destination" />
          </div>
          
          <button className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
            Calculate Fare
          </button>
        </div>
        
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[400px]">
          <p className="text-slate-500">Map Interface (Demo Mode Fallback)</p>
        </div>
      </div>
    </div>
  );
}
