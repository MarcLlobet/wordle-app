import { dbClient, sqlQuery } from '../connection'
import {
    filtradorParaules,
    filtreCaractersAbecedari,
    filtreNomsPropis,
    filtreRangQuantitatLletres,
    modificaACaractersValids,
} from '../utils/filtres'

const getDiccionari = async () => {
    const diccionariUrl =
        'https://github.com/Softcatala/catalan-dict-tools/raw/refs/heads/master/resultats/lt/diccionari.txt'

    const diccionariString = await fetch(diccionariUrl)
    const diccionariText = await diccionariString.text()

    const entrades = diccionariText.split('\n')

    const paraulesInfinitives = entrades.reduce((prev, entrada) => {
        const [conjugada, origen] = entrada.split(' ')
        if (conjugada !== origen) return prev

        return [...prev, origen]
    }, [] as string[])

    const paraules = filtradorParaules(paraulesInfinitives, [
        filtreRangQuantitatLletres,
        filtreNomsPropis,
        filtreCaractersAbecedari,
    ])

    return paraules
}

export type ColumnesDiccionari = {
    paraula_original: string
    paraula: string
    llargada: number
}

const getFilesParaules = (paraules: string[]): ColumnesDiccionari[] =>
    paraules.map((paraula) => ({
        paraula_original: paraula,
        paraula: modificaACaractersValids(paraula),
        llargada: paraula.length,
    }))

const insertaParaulesAlDiccionari = async (
    filesParaules: ColumnesDiccionari[]
) => {
    const insertaParaulesQuery = `
DO $$
BEGIN
  -- Volcat de paraules
  INSERT INTO diccionari (paraula_original, paraula, llargada)
  VALUES 
    ${filesParaules
        .map(
            ({ paraula_original, paraula, llargada }) =>
                `('${paraula_original}', '${paraula}', ${llargada})`
        )
        .join(',\n')};

  PERFORM refresh_tot();
  PERFORM refresh_paraules_punts();
END;
$$;
`

    await sqlQuery(insertaParaulesQuery)
}

const esborraFilesDelDiccionari = async () => {
    const { error } = await dbClient.from('diccionari').delete().gt('id', 0)

    if (error) {
        console.error('Delete error:', 'diccionari', error)
    } else {
        console.log('Deleted all rows from:', 'diccionari')
    }
}

export const up = async () => {
    const paraules = await getDiccionari()
    const filesParaules = getFilesParaules(paraules)
    await insertaParaulesAlDiccionari(filesParaules)
}

export const down = async () => {
    await esborraFilesDelDiccionari()
}
