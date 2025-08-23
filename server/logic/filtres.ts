import { ABECEDARI_TEXT } from '../intents'
import type { Entrada } from '../types'

const QUANTITAT_LLETRES = 5
const MARCA_C_TRENCADA = 'MARCA_C_TRENCADA'

const manipulaParaula = (
    paraula: string,
    manipulacions: ((paraula: string) => string)[]
): string =>
    manipulacions.reduce(
        (paraulaModificada, manipulacio) => manipulacio(paraulaModificada),
        paraula
    )

const manipulaReferenciaLaCTrencada = (paraula: string): string =>
    paraula.replace(/ç/g, MARCA_C_TRENCADA)

const manipulaParaulesNormalitzades = (paraula: string): string =>
    paraula.normalize('NFD')
const manipulaParaulaSenseTitlles = (paraula: string): string =>
    paraula.replace(/[\u0300-\u036f]/g, '')
const manipulaRecuperarLaCTrencada = (paraula: string): string =>
    paraula.replace(new RegExp(MARCA_C_TRENCADA, 'g'), 'ç')

export const filtreCaractersValids = (paraula: string): string =>
    manipulaParaula(paraula, [
        manipulaReferenciaLaCTrencada,
        manipulaParaulesNormalitzades,
        manipulaParaulaSenseTitlles,
        manipulaRecuperarLaCTrencada,
    ])

type FiltreParaulaCallback = (paraula: string) => boolean

export const filtradorParaules = (
    items: string[],
    filtres: FiltreParaulaCallback[]
) => filtres.reduce((prevItems, filtre) => prevItems.filter(filtre), items)

type FiltreEntradaCallback = (entrada: Entrada) => boolean

export const filtradorEntrades = (
    items: Entrada[],
    filtres: FiltreEntradaCallback[]
) => filtres.reduce((prevItems, filtre) => prevItems.filter(filtre), items)

export const filtreQuantitatLletres: FiltreEntradaCallback = ({ origen }) =>
    origen?.length === QUANTITAT_LLETRES

export const filtreInfinitius: FiltreEntradaCallback = ({ origen, derivada }) =>
    origen === derivada

export const filtreNomsPropis: FiltreEntradaCallback = ({ origen }) =>
    origen?.toLowerCase() === origen

export const filtreCaractersAbecedari = ({ origen }: Entrada): boolean => {
    const paraulaAmbCaractersValids = origen
        ? filtreCaractersValids(origen)
        : ''
    return paraulaAmbCaractersValids
        .split('')
        .every((lletra) => ABECEDARI_TEXT.includes(lletra))
}

export const filtreCaractersUnics = (paraula: string): boolean =>
    paraula.length === new Set(paraula).size
