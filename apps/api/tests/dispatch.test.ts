import { describe, it, expect } from 'vitest';

export function calculateScore(eta: number, idleTime: number, w1 = 0.7, w2 = 0.3) {
  // Simple normalization for test: lower ETA is better (so invert), higher idle time is better
  const normalizedEta = Math.max(0, 100 - eta) / 100;
  const normalizedIdle = Math.min(idleTime, 60) / 60;
  return (w1 * normalizedEta) + (w2 * normalizedIdle);
}

describe('Dispatch Engine', () => {
  it('prioritizes lowest ETA when w1 is high', () => {
    const driverA = { id: 1, eta: 5, idleTime: 10 };
    const driverB = { id: 2, eta: 15, idleTime: 50 };
    
    const scoreA = calculateScore(driverA.eta, driverA.idleTime, 0.9, 0.1);
    const scoreB = calculateScore(driverB.eta, driverB.idleTime, 0.9, 0.1);
    
    expect(scoreA).toBeGreaterThan(scoreB);
  });

  it('prioritizes idle time when w2 is high', () => {
    const driverA = { id: 1, eta: 5, idleTime: 10 };
    const driverB = { id: 2, eta: 15, idleTime: 50 };
    
    const scoreA = calculateScore(driverA.eta, driverA.idleTime, 0.1, 0.9);
    const scoreB = calculateScore(driverB.eta, driverB.idleTime, 0.1, 0.9);
    
    expect(scoreB).toBeGreaterThan(scoreA);
  });
});
