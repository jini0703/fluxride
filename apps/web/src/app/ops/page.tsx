"use client";

import { useState } from "react";
import { MapProvider } from "@/components/MapProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Users, Car, Zap, RefreshCw, Settings2 } from "lucide-react";

export default function OpsPage() {
  const [simRunning, setSimRunning] = useState(false);

  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="w-full md:w-[400px] lg:w-[480px] h-1/2 md:h-full bg-background border-r flex flex-col relative z-10 shadow-lg shrink-0 overflow-y-auto">
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                  <Car className="h-4 w-4" /> Active Drivers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">142</div>
                <p className="text-xs text-muted-foreground mt-1">45 available, 97 busy</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> Live Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">18</div>
                <p className="text-xs text-muted-foreground mt-1">Avg wait: 4.2 mins</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Dispatch Simulator</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8"><Settings2 className="h-4 w-4" /></Button>
                  <Button variant={simRunning ? "destructive" : "default"} size="sm" onClick={() => setSimRunning(!simRunning)}>
                    {simRunning ? <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Stop</> : "Start Run"}
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Strategy</span>
                  <span className="font-medium">Weighted ETA + Fairness</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Scenario</span>
                  <span className="font-medium">Rush Hour (Dense)</span>
                </div>
              </div>
              
              {simRunning && (
                <div className="pt-4 border-t space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium">Assignment Latency</span>
                    <span className="text-lg font-bold text-accent">240ms</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium">P95 Pickup ETA</span>
                    <span className="text-lg font-bold text-primary">5.1 min</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: 'R-782', driver: 'D-102', eta: '3m', score: '98.5', status: 'Accepted' },
                  { id: 'R-783', driver: 'D-441', eta: '5m', score: '82.1', status: 'Assigned' },
                  { id: 'R-784', driver: 'D-093', eta: '2m', score: '105.0', status: 'Accepted' },
                ].map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{item.id} &rarr; {item.driver}</div>
                      <div className="text-xs text-muted-foreground">Score: {item.score} • ETA: {item.eta}</div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'Accepted' ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="flex-1 relative bg-slate-100 dark:bg-slate-900">
        <MapProvider>
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
            Ops Dashboard Map View
          </div>
        </MapProvider>
      </div>
    </div>
  );
}
