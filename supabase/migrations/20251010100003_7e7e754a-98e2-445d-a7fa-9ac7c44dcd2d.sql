-- Drop PostGIS from public schema
-- This will remove spatial_ref_sys from public schema
DROP EXTENSION IF EXISTS postgis CASCADE;

-- Reinstall PostGIS in the extensions schema (correct location)
-- This keeps system tables out of the public API
CREATE EXTENSION IF NOT EXISTS postgis SCHEMA extensions;