export const creaFuncioRefreshTot = `
-- Funció per refrescar les taules de manera seqüencial
CREATE OR REPLACE FUNCTION refresh_tot() RETURNS void AS $$
BEGIN
  TRUNCATE TABLE paraules, recompte, puntuacio;
  INSERT INTO paraules (diccionari_id, lletra_1, lletra_2, lletra_3, lletra_4, lletra_5, lletra_6, lletra_7)
SELECT
  id,
  SUBSTRING(paraula, 1, 1)::CHAR(1),
  SUBSTRING(paraula, 2, 1)::CHAR(1),
  SUBSTRING(paraula, 3, 1)::CHAR(1),
  SUBSTRING(paraula, 4, 1)::CHAR(1),
  SUBSTRING(paraula, 5, 1)::CHAR(1),
  SUBSTRING(paraula, 6, 1)::CHAR(1),
  SUBSTRING(paraula, 7, 1)::CHAR(1)
FROM diccionari
  WHERE valid AND llargada BETWEEN 3 AND 7;

  INSERT INTO recompte (lletra, posicio, llargada, quantitat)
  SELECT lletra, posicio, d.llargada, COUNT(*) AS quantitat
  FROM (
    SELECT p.diccionari_id, 1 AS posicio, p.lletra_1 AS lletra FROM paraules p UNION ALL
    SELECT p.diccionari_id, 2, p.lletra_2 FROM paraules p UNION ALL
    SELECT p.diccionari_id, 3, p.lletra_3 FROM paraules p UNION ALL
    SELECT p.diccionari_id, 4, p.lletra_4 FROM paraules p UNION ALL
    SELECT p.diccionari_id, 5, p.lletra_5 FROM paraules p UNION ALL
    SELECT p.diccionari_id, 6, p.lletra_6 FROM paraules p UNION ALL
    SELECT p.diccionari_id, 7, p.lletra_7 FROM paraules p
  ) AS sub
  JOIN diccionari d ON d.id = sub.diccionari_id
  WHERE lletra IS NOT NULL AND d.valid
  GROUP BY lletra, posicio, d.llargada;

  INSERT INTO puntuacio (diccionari_id, puntuacio)
  SELECT p.diccionari_id, SUM(
    COALESCE((SELECT quantitat FROM recompte r WHERE r.lletra = p.lletra_1 AND r.posicio = 1 AND r.llargada = d.llargada), 0) +
    COALESCE((SELECT quantitat FROM recompte r WHERE r.lletra = p.lletra_2 AND r.posicio = 2 AND r.llargada = d.llargada), 0) +
    COALESCE((SELECT quantitat FROM recompte r WHERE r.lletra = p.lletra_3 AND r.posicio = 3 AND r.llargada = d.llargada), 0) +
    COALESCE((SELECT quantitat FROM recompte r WHERE r.lletra = p.lletra_4 AND r.posicio = 4 AND r.llargada = d.llargada), 0) +
    COALESCE((SELECT quantitat FROM recompte r WHERE r.lletra = p.lletra_5 AND r.posicio = 5 AND r.llargada = d.llargada), 0) +
    COALESCE((SELECT quantitat FROM recompte r WHERE r.lletra = p.lletra_6 AND r.posicio = 6 AND r.llargada = d.llargada), 0) +
    COALESCE((SELECT quantitat FROM recompte r WHERE r.lletra = p.lletra_7 AND r.posicio = 7 AND r.llargada = d.llargada), 0)
  ) AS puntuacio
  FROM paraules p
  JOIN diccionari d ON d.id = p.diccionari_id
  WHERE d.valid
  GROUP BY p.diccionari_id, d.llargada;
END;
$$ LANGUAGE plpgsql;`
