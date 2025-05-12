export const creaIndexs = `
CREATE INDEX idx_diccionari_llargada ON diccionari (llargada);
CREATE INDEX idx_diccionari_valid ON diccionari (valid);
CREATE INDEX idx_recompte_clau ON recompte (llargada, posicio, lletra);
CREATE INDEX idx_puntuacio_valor ON puntuacio (puntuacio DESC);`
