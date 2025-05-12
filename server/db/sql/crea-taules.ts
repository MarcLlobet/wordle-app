export const creaTaules = `
-- Taula principal del diccionari
CREATE TABLE diccionari (
    id BIGSERIAL PRIMARY KEY,
    paraula_original TEXT NOT NULL,
    paraula TEXT NOT NULL, -- Sense accents ni caràcters especials
    llargada SMALLINT NOT NULL CHECK (llargada BETWEEN 3 AND 7),
    valid BOOLEAN DEFAULT TRUE
);

-- Taula amb lletres separades per posició
CREATE TABLE paraules (
    diccionari_id BIGINT PRIMARY KEY REFERENCES diccionari(id),
    lletra_1 CHAR(1),
    lletra_2 CHAR(1),
    lletra_3 CHAR(1),
    lletra_4 CHAR(1),
    lletra_5 CHAR(1),
    lletra_6 CHAR(1),
    lletra_7 CHAR(1)
);

-- Taula amb recompte de lletres per posició
CREATE TABLE recompte (
    lletra CHAR(1) NOT NULL,
    posicio SMALLINT NOT NULL CHECK (posicio BETWEEN 1 AND 7),
    llargada SMALLINT NOT NULL CHECK (llargada BETWEEN 3 AND 7),
    quantitat INTEGER NOT NULL,
    PRIMARY KEY (lletra, posicio, llargada)
);

-- Taula amb puntuacions totals per paraula
CREATE TABLE puntuacio (
    diccionari_id BIGINT PRIMARY KEY REFERENCES diccionari(id),
    puntuacio INTEGER NOT NULL
);`
