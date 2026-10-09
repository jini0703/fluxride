export default function OpsTower() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col p-8">
      <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-purple-400">Operations Tower</h1>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-sm">Active Drivers:</span> <span className="font-semibold text-cyan-400">24</span>
          </div>
          <div className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-400 text-sm">Active Rides:</span> <span className="font-semibold text-purple-400">12</span>
          </div>
        </div>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[600px]">
          <p className="text-slate-500">Global Fleet Map</p>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h2 className="text-xl font-semibold mb-4 text-slate-200">Dispatch Simulator</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Strategy</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-50">
                  <option>Nearest Eligible Driver</option>
                  <option>Lowest Predicted ETA</option>
                  <option>Balanced Weighted Scoring</option>
                </select>
              </div>
              
              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                Run Benchmark
              </button>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex-1">
            <h2 className="text-xl font-semibold mb-4 text-slate-200">Benchmark Results</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Mean ETA</span>
                <span className="font-medium">-- min</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">p95 ETA</span>
                <span className="font-medium">-- min</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Assignment Rate</span>
                <span className="font-medium">-- %</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
