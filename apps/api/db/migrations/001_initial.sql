-- Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'rider', -- rider, driver, admin
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE driver_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'offline', -- offline, online, busy
  current_location GEOGRAPHY(Point, 4326),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID REFERENCES users(id),
  make VARCHAR(100),
  model VARCHAR(100),
  license_plate VARCHAR(50) UNIQUE,
  category VARCHAR(50) DEFAULT 'standard'
);

CREATE TABLE rides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rider_id UUID REFERENCES users(id) NOT NULL,
  driver_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'requested', -- requested, matching, driver_assigned, in_progress, completed, cancelled
  pickup_location GEOGRAPHY(Point, 4326) NOT NULL,
  pickup_address TEXT,
  dropoff_location GEOGRAPHY(Point, 4326) NOT NULL,
  dropoff_address TEXT,
  estimated_fare DECIMAL(10,2),
  final_fare DECIMAL(10,2),
  category VARCHAR(50) DEFAULT 'standard',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE dispatch_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES rides(id),
  driver_id UUID REFERENCES users(id),
  strategy VARCHAR(100),
  score DECIMAL(10,4),
  features JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
