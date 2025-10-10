-- Restore the geometry column to cfr_parcels
-- This was removed when PostGIS was dropped with CASCADE
ALTER TABLE public.cfr_parcels
ADD COLUMN geom extensions.geometry(Polygon, 4326);