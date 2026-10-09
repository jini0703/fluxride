# Dispatch Algorithm

FluxRide's dispatch engine evaluates three distinct strategies to optimize ride assignments:

1. **Nearest Eligible Driver**: Assigns the driver with the shortest straight-line or road distance.
2. **Lowest Predicted ETA**: Prioritizes drivers with the lowest time to arrival, factoring in traffic if data is available.
3. **Balanced Weighted Scoring**: A configurable model that considers ETA, distance, driver idle time, and workload fairness.

## Weighting Formula

`Score = (w1 * Normalized(ETA)) + (w2 * Normalized(IdleTime)) + (w3 * Normalized(Fairness))`

Drivers with the highest score are selected.
