import { query } from '../db';
import crypto from 'crypto';

export interface DriverCandidate {
  driver_id: string;
  current_location?: any;
  distance_meters?: number;
  estimated_eta_seconds?: number;
  idle_time_seconds?: number;
  reliability_score?: number;
  total_score?: number;
}

export interface RideRequest {
  ride_id: string;
  pickup_location: { lat: number; lng: number };
  category: string;
}

export class DispatchEngine {
  
  // Strategy 1: Nearest Driver
  static async findNearestDriver(request: RideRequest): Promise<DriverCandidate | null> {
    const radiusMeters = 5000; // 5km search radius
    
    // In demo mode or if no DB, we just mock this.
    // Assuming the DB query module handles the mock response gracefully if needed.
    const sql = `
      SELECT 
        user_id as driver_id,
        current_location,
        ST_Distance(
          current_location,
          ST_SetSRID(ST_MakePoint($1, $2), 4326)
        ) as distance_meters
      FROM driver_profiles
      WHERE status = 'online'
      AND ST_DWithin(
        current_location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326),
        $3
      )
      ORDER BY distance_meters ASC
      LIMIT 1
    `;
    
    try {
      const result = await query(sql, [request.pickup_location.lng, request.pickup_location.lat, radiusMeters]);
      if (result.rows && result.rows.length > 0) {
        return result.rows[0];
      }
    } catch (error) {
      console.error('Error finding nearest driver:', error);
    }
    
    // Fallback for demo
    if (process.env.ENABLE_DEMO_AUTH === 'true') {
      return {
        driver_id: 'mock-driver-1',
        distance_meters: Math.floor(Math.random() * 2000) + 500,
      };
    }
    
    return null;
  }

  // Strategy 2: Lowest Predicted Pickup ETA
  static async findFastestDriver(request: RideRequest): Promise<DriverCandidate | null> {
    // In a real scenario, this would query candidates via PostGIS, 
    // then call a routing engine (e.g. Google Routes) for real ETAs,
    // and sort by ETA.
    const radiusMeters = 7000; 
    
    const sql = `
      SELECT 
        user_id as driver_id,
        current_location,
        ST_Distance(
          current_location,
          ST_SetSRID(ST_MakePoint($1, $2), 4326)
        ) as distance_meters
      FROM driver_profiles
      WHERE status = 'online'
      AND ST_DWithin(
        current_location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326),
        $3
      )
      LIMIT 10
    `;
    
    try {
      const result = await query(sql, [request.pickup_location.lng, request.pickup_location.lat, radiusMeters]);
      let candidates = result.rows;
      
      if (candidates && candidates.length > 0) {
        // Mocking ETA as distance / speed (e.g. 10 meters per sec) + random traffic delay
        candidates = candidates.map(c => ({
          ...c,
          estimated_eta_seconds: (c.distance_meters / 10) + (Math.random() * 120)
        }));
        
        candidates.sort((a, b) => (a.estimated_eta_seconds || 0) - (b.estimated_eta_seconds || 0));
        return candidates[0];
      }
    } catch (error) {
      console.error('Error finding fastest driver:', error);
    }
    
    if (process.env.ENABLE_DEMO_AUTH === 'true') {
      return {
        driver_id: 'mock-driver-2',
        distance_meters: 1500,
        estimated_eta_seconds: 180, // 3 mins
      };
    }
    
    return null;
  }

  // Strategy 3: Balanced Weighted Scoring
  static async findBestWeightedDriver(request: RideRequest): Promise<DriverCandidate | null> {
    const radiusMeters = 10000;
    
    const sql = `
      SELECT 
        dp.user_id as driver_id,
        dp.current_location,
        EXTRACT(EPOCH FROM (NOW() - dp.updated_at)) as idle_time_seconds,
        ST_Distance(
          dp.current_location,
          ST_SetSRID(ST_MakePoint($1, $2), 4326)
        ) as distance_meters
      FROM driver_profiles dp
      WHERE dp.status = 'online'
      AND ST_DWithin(
        dp.current_location,
        ST_SetSRID(ST_MakePoint($1, $2), 4326),
        $3
      )
      LIMIT 20
    `;
    
    try {
      const result = await query(sql, [request.pickup_location.lng, request.pickup_location.lat, radiusMeters]);
      
      if (result.rows && result.rows.length > 0) {
        const candidates = result.rows.map(c => {
          const eta = (c.distance_meters / 10) + (Math.random() * 120);
          const idleTime = c.idle_time_seconds || 0;
          const reliability = 0.95; // default if not enough history
          
          // Normalized Scoring (Lower is better for ETA/distance, Higher is better for idle/reliability)
          // We'll normalize so Higher Score is Better overall.
          
          // Max ETA considered: 1200s (20 mins). Score: 1200 - eta. (Weight: 50%)
          const etaScore = Math.max(0, 1200 - eta) / 1200 * 50;
          
          // Idle time: cap at 3600s. (Weight: 30%)
          const idleScore = Math.min(idleTime, 3600) / 3600 * 30;
          
          // Reliability: 0 to 1. (Weight: 20%)
          const relScore = reliability * 20;
          
          const total_score = etaScore + idleScore + relScore;
          
          return {
            ...c,
            estimated_eta_seconds: eta,
            idle_time_seconds: idleTime,
            reliability_score: reliability,
            total_score
          };
        });
        
        candidates.sort((a, b) => (b.total_score || 0) - (a.total_score || 0));
        return candidates[0];
      }
    } catch (error) {
      console.error('Error finding weighted driver:', error);
    }
    
    if (process.env.ENABLE_DEMO_AUTH === 'true') {
      return {
        driver_id: 'mock-driver-3',
        distance_meters: 2000,
        estimated_eta_seconds: 240,
        idle_time_seconds: 900,
        reliability_score: 0.98,
        total_score: 85.5
      };
    }
    
    return null;
  }
  
  static async recordDispatchDecision(rideId: string, driverId: string, strategy: string, candidate: DriverCandidate) {
    try {
      const sql = `
        INSERT INTO dispatch_decisions (ride_id, driver_id, strategy, score, features)
        VALUES ($1, $2, $3, $4, $5)
      `;
      await query(sql, [
        rideId, 
        driverId, 
        strategy, 
        candidate.total_score || candidate.estimated_eta_seconds || candidate.distance_meters || 0,
        JSON.stringify(candidate)
      ]);
    } catch (error) {
      console.error('Failed to record dispatch decision:', error);
    }
  }
}
