export const destrueixDatabasesQueries = `
-- Eliminar funció global de refresc
DROP FUNCTION IF EXISTS refresh_tot CASCADE;

-- Eliminar funcions individuals de refresc
DROP FUNCTION IF EXISTS refresh_paraules CASCADE;
DROP FUNCTION IF EXISTS refresh_recompte CASCADE;
DROP FUNCTION IF EXISTS refresh_puntuacio CASCADE;

-- Eliminar índexs
DROP INDEX IF EXISTS idx_paraules_diccionari_id;
DROP INDEX IF EXISTS idx_puntuacio_diccionari_id;

-- Eliminar taules dependents (ordre invers a la creació)
DROP TABLE IF EXISTS puntuacio;
DROP TABLE IF EXISTS recompte;
DROP TABLE IF EXISTS paraules;
DROP TABLE IF EXISTS diccionari;
`
