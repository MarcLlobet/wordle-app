export const ABECEDARI_AMB_ACCENTS = 'àabcçdèéefghiíjklmnòóopqrstuúvwxyz'
export const ABECEDARI = 'abcçdefghijklmnopqrstuvwxyz'

export const MAX_QUANTITAT_LLETRES = 7
export const MIN_QUANTITAT_LLETRES = 3
const MARCA_C_TRENCADA = 'MARCA_C_TRENCADA'

type FiltreParaulaCallback = (paraula: string) => boolean

export const filtradorParaules = (
    items: string[],
    filtres: FiltreParaulaCallback[]
) => filtres.reduce((prevItems, filtre) => prevItems.filter(filtre), items)

export const filtreRangQuantitatLletres: FiltreParaulaCallback = (paraula) =>
    paraula?.length >= MIN_QUANTITAT_LLETRES &&
    paraula?.length <= MAX_QUANTITAT_LLETRES

export const filtreNomsPropis: FiltreParaulaCallback = (paraula) =>
    paraula?.toLowerCase() === paraula

type Modificador = (paraula: string) => string
const modificaParaula = (
    paraula: string,
    modificacions: Modificador[]
): string =>
    modificacions.reduce(
        (paraulaModificada, modificacio) => modificacio(paraulaModificada),
        paraula
    )

const modificaReferenciaLaCTrencada: Modificador = (paraula) =>
    paraula.replace(/ç/g, MARCA_C_TRENCADA)

const modificaParaulesNormalitzades: Modificador = (paraula) =>
    paraula.normalize('NFD')

const modificaParaulaSenseTitlles: Modificador = (paraula) =>
    paraula.replace(/[\u0300-\u036f]/g, '')

const modificaRecuperarLaCTrencada: Modificador = (paraula) =>
    paraula.replace(new RegExp(MARCA_C_TRENCADA, 'g'), 'ç')

export const modificaACaractersValids: Modificador = (paraula) =>
    modificaParaula(paraula, [
        modificaReferenciaLaCTrencada,
        modificaParaulesNormalitzades,
        modificaParaulaSenseTitlles,
        modificaRecuperarLaCTrencada,
    ])

export const filtreCaractersAbecedari: FiltreParaulaCallback = (paraula) => {
    return paraula
        .split('')
        .every((lletra) => ABECEDARI_AMB_ACCENTS.includes(lletra))
}

export const filtreCaractersUnics = (paraula: string): boolean =>
    paraula.length === new Set(paraula).size
