# Supabase Integration for Raashi Shetty Speech Therapy Hub - 'frontend_web' React Container

## Instructions

- Set the following environment variables in the React `.env` file:
  - `REACT_APP_SUPABASE_URL` - your Supabase project URL
  - `REACT_APP_SUPABASE_KEY` - your Supabase anon/public API key

These variables are referenced in `src/App.js` to initialize the Supabase client:
```js
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
```

- Authentication, appointment bookings, and (optionally) premium video access are wired via Supabase client.
- On the first deployment, ensure that the tables `appointments` (and optionally `videos`, `subscribers`) are created and proper Row Level Security (RLS) is set up in the Supabase dashboard.

- User auth is managed through Supabase email/password and Google OAuth in the Authentication page.

- Adjust the Supabase storage, database schema, and RLS as per actual needs.

- For local dev: copy .env.example to .env and fill out the Supabase values.

## Additional Notes
- All requests use the `supabase-js` v2 client.
- All sensitive keys are handled through the `.env` file for security.
- Video gallery and testimonials use demo data but are designed to fetch from Supabase when available.

