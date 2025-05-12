export const creaParaulesPunts = `
CREATE MATERIALIZED VIEW paraules_punts AS
SELECT 
  p.diccionari_id,
  d.paraula_original,
  d.paraula,
  d.llargada,
  d.valid,
  p.puntuacio
FROM puntuacio p
JOIN diccionari d ON p.diccionari_id = d.id
WHERE d.valid = true;

CREATE OR REPLACE FUNCTION refresh_paraules_punts() RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW paraules_punts;
END;
$$ LANGUAGE plpgsql;`
