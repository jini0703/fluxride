export default function DriverDashboard() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-lime-400">Driver Dashboard</h1>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-lime-500"></div>
          <span className="text-slate-300 font-medium">Online</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2">Active Requests</h2>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-400">Pickup: 123 Main St</p>
              <p className="text-sm text-slate-400">Dropoff: 456 Market St</p>
              <p className="font-semibold text-lime-400 mt-1">Est. Fare: $12.50</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Reject</button>
              <button className="bg-lime-600 hover:bg-lime-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-slate-950">Accept</button>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[400px]">
          <p className="text-slate-500">Navigation Map</p>
        </div>
      </div>
    </div>
  );
}
