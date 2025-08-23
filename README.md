[![CI](https://github.com/MarcLlobet/millor-primera-paraula-wordle/actions/workflows/ci.yml/badge.svg)](https://github.com/MarcLlobet/millor-primera-paraula-wordle/actions/workflows/ci.yml)

# wordle

Juga a wordle sense parar! Amb extres com recomanacions de paraules, diferents llargades de paraula i molt més!

### Algortime

- Filtrem el diccionari per paraules de la llargada
- Passem per totes les paraules contant quantes vegades surt cada lletra
    - Obtindrem el número total de coincidències per lletra (exemple: b => 500 vegades)
- Passem per totes les posicions contant cada lletra
    - Obtindrem el número total de coincidències per lletra a cada posició (exemple: b => 100 vegades a la posició 1)
- Passem per totes les paraules assignant una puntuació:
    - Fem un sumatori de cada lletra: La posició més la lletra total.
    - Exemple: "arbre":
        - Primera lletra, "a", sumem el total de vegades que surt més el total de vegades que surt a la primera posició. Així amb totes les lletres.
        - Hi haurà una excepció. Només es sumarà el total una vegada. Si es repeteixen les lletres, com per exemple, la segona "r", només es sumarà la seva posició. És una forma de penalitzar les lletres duplicades.
- Ordenem les paraules per puntuació.

## Ús

Córre `yarn` per instalar-ho tot.

Córre `yarn dev` per correr el frontend. I `yarn dev:server` en un altre terminal, per al backend.

### Requisits

Necessites tenir _node_ amb _npm_ instalat.

Si et falta _yarn_, fés `npm i -g yarn`.
