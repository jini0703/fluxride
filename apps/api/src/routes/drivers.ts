import { Router } from 'express';
import { query } from '../db';

const router = Router();

// Update driver location and availability
router.post('/:id/location', async (req, res) => {
  const { id } = req.params;
  const { lat, lng, status } = req.body;
  
  try {
    await query(
      `INSERT INTO driver_profiles (user_id, status, current_location, updated_at)
       VALUES ($1, $2, ST_SetSRID(ST_MakePoint($4, $3), 4326), NOW())
       ON CONFLICT (user_id) 
       DO UPDATE SET status = EXCLUDED.status, current_location = EXCLUDED.current_location, updated_at = NOW()`,
      [id, status || 'online', lat, lng]
    );
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

export default router;
