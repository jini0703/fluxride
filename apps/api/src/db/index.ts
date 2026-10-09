import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const isDemo = process.env.ENABLE_DEMO_AUTH === 'true';

// We allow this to fail gracefully in demo mode if Docker isn't running
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/fluxride',
});

export const query = async (text: string, params?: any[]) => {
  if (isDemo && !process.env.DATABASE_URL) {
    console.log('[Demo Mode] Mocking query:', text);
    return { rows: [] };
  }
  return pool.query(text, params);
};
