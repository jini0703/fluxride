import { Router } from 'express';
import { query } from '../db';
import { io } from '../app';

const router = Router();

// Create ride request
router.post('/request', async (req, res) => {
  const { riderId, pickupLat, pickupLng, dropoffLat, dropoffLng, category } = req.body;
  
  try {
    const result = await query(
      `INSERT INTO rides (rider_id, pickup_location, dropoff_location, category, status)
       VALUES ($1, ST_SetSRID(ST_MakePoint($3, $2), 4326), ST_SetSRID(ST_MakePoint($5, $4), 4326), $6, 'requested')
       RETURNING id, status, created_at`,
      [riderId, pickupLat, pickupLng, dropoffLat, dropoffLng, category || 'standard']
    );
    
    const ride = result.rows[0];
    // Notify operations
    io.to('ops').emit('ride_requested', ride);
    
    // In a real system, we would trigger dispatch here.
    res.json(ride || { id: 'demo-id', status: 'requested' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create ride' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await query(`SELECT * FROM rides WHERE id = $1`, [req.params.id]);
    res.json(result.rows[0] || { id: req.params.id, status: 'requested' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch ride' });
  }
});

export default router;
