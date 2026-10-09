"use client";

import { useState } from "react";
import { MapProvider } from "@/components/MapProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Power, PowerOff, MapPin, Navigation } from "lucide-react";

export default function DriverPage() {
  const [isOnline, setIsOnline] = useState(false);
  const [request, setRequest] = useState<any>(null); // To mock a ride request

  return (
    <div className="flex flex-col md:flex-row h-full">
      <div className="w-full md:w-[400px] h-1/2 md:h-full bg-background border-r flex flex-col relative z-10 shadow-lg shrink-0 overflow-y-auto">
        <div className="p-4 space-y-4">
          <Card className="border-0 shadow-none bg-muted/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Status</span>
                <div className={`px-2 py-1 rounded text-xs font-bold ${isOnline ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                  {isOnline ? 'ONLINE' : 'OFFLINE'}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                variant={isOnline ? "destructive" : "default"} 
                className="w-full h-12 text-lg gap-2"
                onClick={() => setIsOnline(!isOnline)}
              >
                {isOnline ? (
                  <><PowerOff className="h-5 w-5" /> Go Offline</>
                ) : (
                  <><Power className="h-5 w-5" /> Go Online</>
                )}
              </Button>
            </CardContent>
          </Card>

          {isOnline && !request && (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 relative">
                <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-75"></div>
                <Navigation className="h-6 w-6 text-accent" />
              </div>
              <p>Waiting for requests...</p>
            </div>
          )}

          {request && (
            <Card className="border-accent border-2 shadow-lg animate-in slide-in-from-bottom-4">
              <CardHeader className="bg-accent/10 pb-4">
                <CardTitle className="flex justify-between items-center text-lg">
                  <span>New Request</span>
                  <span className="text-accent font-bold">2.4 km away</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium">Downtown Transit Center</div>
                    <div className="text-sm text-muted-foreground">Pickup in ~5 mins</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => setRequest(null)}>Decline</Button>
                  <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => {}}>Accept</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <div className="flex-1 relative bg-slate-100 dark:bg-slate-900">
        <MapProvider>
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground pointer-events-none">
            Driver Map View
          </div>
        </MapProvider>
      </div>
    </div>
  );
}
