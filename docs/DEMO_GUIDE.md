# Demo Guide

To run FluxRide without external credentials (Google Maps, Stripe, Clerk):

1. Set `ENABLE_DEMO_AUTH="true"` in `.env`.
2. Omit `GOOGLE_MAPS_API_KEY` and `STRIPE_SECRET_KEY` in `.env`.
3. Start the application.
4. Click the "Demo Login" button to authenticate as a rider, driver, or admin.
5. In demo mode, fares and ETAs are deterministically simulated. Payments will mock a success flow.
