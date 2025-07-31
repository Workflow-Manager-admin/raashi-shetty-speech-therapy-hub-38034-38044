# Supabase Integration for Raashi Shetty Speech Therapy Hub - 'frontend_web' React Container

## Current Status (as of setup)

- **Tables Present:** `appointments` (missing user_id), `questionnaires`, `videos`, `subscribers`
- **Videos Table:** Created, with columns: id (bigserial), title (text), url (text), description (text), created_at (timestamp)
- **Subscribers Table:** Created, with columns: id (bigserial), user_id (uuid), subscribed_at (timestamp), status (default 'active')
- **RLS and Policies:** 
    - `videos`: Public select (awareness videos for all)
    - `subscribers`: Only allow users to view/insert their own subscriptions
    - `appointments`: *ERROR* - RLS could not be fully set up, **user_id is missing on appointments** (see below)
- **ERROR / TODO:** The `appointments` table is missing a `user_id` (uuid, nullable) column. 
    - **To fully secure appointment booking and user-specific access, you MUST add a user_id column and (re)apply the following SQL:**

      ```sql
      ALTER TABLE appointments ADD COLUMN user_id uuid;
      ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Appointments: user or therapist can insert/view their own" ON appointments FOR SELECT USING (user_id = auth.uid());
      CREATE POLICY "Appointments: user can insert their own" ON appointments FOR INSERT WITH CHECK (user_id = auth.uid());
      ```
    - Repeat these steps in Supabase SQL editor to finish setup!

- **How to connect Supabase to React app:**

  Set the following environment variables in the React `.env` file:
  - `REACT_APP_SUPABASE_URL` - your Supabase project URL
  - `REACT_APP_SUPABASE_KEY` - your Supabase anon/public API key

  These variables are referenced in `src/App.js` to initialize the Supabase client:
  ```js
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  ```

  - All authentication, appointment bookings, and (optionally) premium video access are wired through this Supabase client.
  - **User authentication:** via Supabase email/password + Google OAuth on the Auth page/component.
  - **Video gallery and testimonials:** currently use demo data, but videos fetch from Supabase when ready.

  - Adjust Supabase storage, database schema, and RLS as your real usage evolves!
  - For local dev: copy .env.example to .env and fill out the Supabase values.

## Additional Notes
- All requests use the `supabase-js` v2 client.
- All sensitive keys are handled through the `.env` file for security.
- After DB and RLS corrections, the frontend can securely book appointments, fetch videos, manage user subscriptions, and authenticate users.

## Admin Authentication

- Admin access is restricted via email allow-list in the frontend. To grant admin access, add the admin's email to the `ADMIN_EMAILS` array in both AdminDashboard.js and AdminRoute.js.
- No Supabase role is required: simply ensure the allowed admin user's email matches one on the list.
- All critical admin UI and management areas are protected by this logic in the React app. 

