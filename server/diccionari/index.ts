import fs from 'fs'
import path from 'path'
import { EstatWordle, validaLlargada } from '../bitwise'
import { ABECEDARI_LLISTA } from '../intents'
import { getEntrades, getEntradesPerParaula } from './getEntrades'

const UTF8_ENCODING = 'utf-8'

const testFileExtension = process.env.TEST === 'test' ? '-test' : ''

export const getDiccionari = () => {
    const diccionariPath = path.resolve(
        `./server/diccionari/diccionari${testFileExtension}.txt`
    )
    const diccionari: string = fs.readFileSync(diccionariPath, UTF8_ENCODING)
    return diccionari
}

export const getTotesLesEntrades = () => {
    const diccionari = getDiccionari()
    const totesLesEntrades = getEntrades(diccionari)
    return totesLesEntrades
}

export const getEntradesOriginals = () => {
    const totesLesEntrades = getTotesLesEntrades()
    return totesLesEntrades.map(({ origen }) => origen)
}

export const getTotesLesEntradesPerParaula = () => {
    const totesLesEntrades = getTotesLesEntrades()
    const entradesPerParaula = getEntradesPerParaula(totesLesEntrades)
    return entradesPerParaula
}

export const getTotesLesParaules = () => {
    const totesLesEntradesPerParaula = getTotesLesEntradesPerParaula()
    const totesLesParaules = Object.keys(totesLesEntradesPerParaula)
    return totesLesParaules
}

export const getTotesLesParaulesAmbLlargada = (llargada: number) => {
    const llargadaDeCincLletres = validaLlargada({ llargada } as EstatWordle)
    const paraules = getTotesLesParaules()
    return paraules.filter(llargadaDeCincLletres)
}

type RecomptePerLletra = Record<
    string,
    [number, number, number, number, number]
>

const getRecomptePerPosicioInicial = (llargada: number): RecomptePerLletra =>
    ABECEDARI_LLISTA.reduce(
        (prev, lletra) => ({
            ...prev,
            [lletra]: Array.from({ length: llargada }).map(() => 0),
        }),
        {}
    )

const getRecomptePerPosicio = (paraules: string[]) =>
    paraules.reduce(
        (prevParaula, paraula) => ({
            ...prevParaula,
            ...paraula.split('').reduce(
                (prevLletra, lletra, posicioLletra) =>
                    ({
                        ...prevLletra,
                        [lletra]: [
                            ...prevLletra[lletra].slice(0, posicioLletra),
                            prevLletra[lletra][posicioLletra] + 1,
                            ...prevLletra[lletra].slice(posicioLletra + 1),
                        ],
                    }) as RecomptePerLletra,
                prevParaula
            ),
        }),
        getRecomptePerPosicioInicial(paraules[0].length)
    )

const getRecomptePerTotalInicial = (): Record<string, number> =>
    ABECEDARI_LLISTA.reduce(
        (prev, lletra) => ({
            ...prev,
            [lletra]: 0,
        }),
        {}
    )

const getRecomptePerTotal = (recomptePerPosicio: RecomptePerLletra) =>
    Object.entries(recomptePerPosicio).reduce(
        (prevRecompte, [lletra, recompte]) => ({
            ...prevRecompte,
            [lletra]: recompte.reduce((prevNum, num) => prevNum + num, 0),
        }),
        getRecomptePerTotalInicial()
    )

export const getParaules = () => {
    const LLARGADA = 5

    const paraulesLlargadaN = getTotesLesParaulesAmbLlargada(LLARGADA)
    const recomptePerPosicio = getRecomptePerPosicio(paraulesLlargadaN)
    const recomptePerTotal = getRecomptePerTotal(recomptePerPosicio)

    const recomptePerParaula = paraulesLlargadaN.map((paraula) => {
        const teDuplicats = paraula.length !== new Set(paraula).size

        return {
            paraula,
            punts: paraula
                .split('')
                .reduce(
                    (prevPunts, lletra, posicio) =>
                        prevPunts +
                        (teDuplicats && paraula.indexOf(lletra) !== posicio
                            ? 0
                            : recomptePerTotal[lletra]) +
                        recomptePerPosicio[lletra][posicio],
                    0
                ),
        }
    })

    const paraulesOrdenades = [...recomptePerParaula]
        .sort((a, b) => b.punts - a.punts)
        .map(({ paraula }) => paraula)

    return paraulesOrdenades
}

export const getParaulaAleatoria = (paraules: string[]) => {
    const randomIndex = Math.floor(Math.random() * paraules.length)
    return paraules[randomIndex]
}
