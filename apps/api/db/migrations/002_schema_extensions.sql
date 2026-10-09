CREATE TABLE saved_places (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100),
  location GEOGRAPHY(Point, 4326),
  address TEXT,
  place_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES rides(id),
  provider_id VARCHAR(255),
  amount DECIMAL(10,2),
  currency VARCHAR(10) DEFAULT 'USD',
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ride_id UUID REFERENCES rides(id),
  rater_id UUID REFERENCES users(id),
  ratee_id UUID REFERENCES users(id),
  score INTEGER CHECK (score >= 1 AND score <= 5),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE operations_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255),
  seed VARCHAR(100),
  fleet_size INTEGER,
  strategies JSONB,
  results JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Geospatial Indexes
CREATE INDEX idx_driver_profiles_location ON driver_profiles USING GIST (current_location);
CREATE INDEX idx_rides_pickup_location ON rides USING GIST (pickup_location);
CREATE INDEX idx_rides_dropoff_location ON rides USING GIST (dropoff_location);

-- Add missing columns to rides
ALTER TABLE rides ADD COLUMN place_id_pickup VARCHAR(255);
ALTER TABLE rides ADD COLUMN place_id_dropoff VARCHAR(255);
