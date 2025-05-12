export const creaFuncioFiltraParaules = `
CREATE OR REPLACE FUNCTION filtra_paraules(input JSON)
RETURNS TABLE (
  id BIGINT,
  paraula TEXT,
  paraula_original TEXT,
  llargada SMALLINT,
  puntuacio INTEGER
) AS $$
DECLARE
  sql TEXT;
  elem JSON;
  lletra TEXT;
  pos INT;
  llarg INT;
  limit_param INT;
BEGIN
  llarg := (input->>'llargada')::INT;
  limit_param := GREATEST(COALESCE((input->>'limit')::INT, 10), 1);

  sql := '
    SELECT d.id, d.paraula, d.paraula_original, d.llargada, pu.puntuacio
    FROM diccionari d
    JOIN paraules p ON d.id = p.diccionari_id
    JOIN puntuacio pu ON d.id = pu.diccionari_id
    WHERE d.valid = TRUE';

  -- Filtra per llargada
  sql := sql || format(' AND d.llargada = %s', llarg);

  -- Encerts
  FOR elem IN SELECT * FROM json_array_elements(input->'encerts')
  LOOP
    lletra := elem->>0;
    pos := (elem->>1)::INT;
    sql := sql || format(' AND p.lletra_%s = %L', pos, lletra);
  END LOOP;

  -- Mal colocades
  FOR elem IN SELECT * FROM json_array_elements(input->'malColocades')
  LOOP
    lletra := elem->>0;
    pos := (elem->>1)::INT;

    sql := sql || format(' AND p.lletra_%s <> %L', pos, lletra);

    sql := sql || ' AND (';
    FOR i IN 1..llarg LOOP
      IF i != pos THEN
        sql := sql || format('p.lletra_%s = %L OR ', i, lletra);
      END IF;
    END LOOP;
    sql := left(sql, length(sql) - 4) || ')';
  END LOOP;

  -- Descartades
  IF input->'descartades' IS NOT NULL THEN
    FOR lletra IN SELECT * FROM json_array_elements_text(input->'descartades')
    LOOP
      sql := sql || ' AND ';
      FOR i IN 1..llarg LOOP
        sql := sql || format('p.lletra_%s <> %L AND ', i, lletra);
      END LOOP;
      sql := left(sql, length(sql) - 5);
    END LOOP;
  END IF;

  -- Afegim ORDER BY i LIMIT
  sql := sql || format(' ORDER BY pu.puntuacio DESC LIMIT %s', limit_param);

  -- Executar la consulta
  RETURN QUERY EXECUTE sql;
END;
$$ LANGUAGE plpgsql;
`
