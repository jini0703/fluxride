"use client";

import { APIProvider } from "@vis.gl/react-google-maps";
import { ReactNode } from "react";

export function MapProvider({ children }: { children: ReactNode }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  if (!apiKey) {
    // Demo mode fallback UI
    return (
      <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 overflow-hidden flex flex-col items-center justify-center p-8 text-center border rounded-xl">
        {/* Simple mock map grid */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 opacity-10 pointer-events-none">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="relative z-10 bg-background/80 backdrop-blur-sm p-6 rounded-xl border shadow-sm max-w-md">
          <h3 className="font-semibold text-lg mb-2 text-foreground">Demo Mode (No Map Key)</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Map view is disabled because <code>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> is missing. 
            You can still interact with the application using the simulated demo locations.
          </p>
          <div className="flex gap-2 justify-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">📍</div>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey} libraries={["places"]}>
      {children}
    </APIProvider>
  );
}
