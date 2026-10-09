"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Map, MapPin, Navigation, Clock } from "lucide-react";
// We will add the actual Google Map component later in this space

export default function BookPage() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [step, setStep] = useState<"search" | "confirm" | "searching">("search");

  return (
    <>
      <div className="w-full md:w-[400px] h-1/2 md:h-full bg-background border-r flex flex-col relative z-10 shadow-lg shrink-0 overflow-y-auto">
        <div className="p-4 space-y-4 flex-1">
          {step === "search" && (
            <Card className="border-0 shadow-none">
              <CardHeader className="px-0 pt-0">
                <CardTitle>Where to?</CardTitle>
                <CardDescription>Book your ride now</CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                  <Input 
                    placeholder="Pickup location" 
                    className="pl-9 bg-muted/50" 
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <Navigation className="absolute left-3 top-2.5 h-4 w-4 text-accent" />
                  <Input 
                    placeholder="Where to?" 
                    className="pl-9 bg-muted/50"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="px-0 pb-0 pt-4">
                <Button 
                  className="w-full" 
                  disabled={!pickup || !dropoff}
                  onClick={() => setStep("confirm")}
                >
                  Search Rides
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === "confirm" && (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setStep("search")} className="-ml-2 mb-2">
                &larr; Back
              </Button>
              
              <h3 className="font-semibold text-lg">Choose a ride</h3>
              
              <div className="space-y-3">
                {[
                  { id: 'standard', name: 'Flux Standard', price: '$12.50', time: '3 min', icon: '🚙' },
                  { id: 'comfort', name: 'Flux Comfort', price: '$18.00', time: '5 min', icon: '🚗' },
                  { id: 'xl', name: 'Flux XL', price: '$24.50', time: '8 min', icon: '🚐' }
                ].map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-3 rounded-lg border hover:border-primary cursor-pointer transition-colors bg-card">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{ride.icon}</div>
                      <div>
                        <div className="font-medium">{ride.name}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {ride.time} away
                        </div>
                      </div>
                    </div>
                    <div className="font-bold">{ride.price}</div>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-auto">
                <Button 
                  className="w-full h-12 text-lg" 
                  onClick={() => setStep("searching")}
                >
                  Confirm Flux Standard
                </Button>
              </div>
            </div>
          )}

          {step === "searching" && (
            <div className="flex flex-col items-center justify-center h-full space-y-6 py-12 text-center">
              <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
              <div>
                <h3 className="text-xl font-bold mb-2">Finding your driver</h3>
                <p className="text-muted-foreground">Contacting nearby vehicles through the dispatch intelligence engine...</p>
              </div>
              <Button variant="outline" onClick={() => setStep("search")}>
                Cancel Request
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Map Area */}
      <div className="flex-1 relative bg-slate-100 dark:bg-slate-900">
        {/* We will render the real Google Map here if API key is present */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          Map Viewport
        </div>
      </div>
    </>
  );
}
