import { Context } from './Context'

export const ABECEDARI_TEXT = 'abcçdefghijklmnopqrstuvwxyz'
export const ABECEDARI_LLISTA = ABECEDARI_TEXT.split('')

type LletraPosicio = [string, number]
export type ContextParaula = {
    paraula: string
    llistaParaula: string[]
    conteLletraPerLletra: Record<string, boolean>
}

const ESTAT_LLETRA = {
    ERRONI: 0,
    MAL_COLOCAT: 1,
    ENCERTAT: 2,
} as const

const getEstat = (
    lletraPosicio: LletraPosicio,
    contextParaula: ContextParaula
) => {
    const [lletra, posicio] = lletraPosicio

    if (contextParaula.llistaParaula[posicio] === lletra) {
        return ESTAT_LLETRA.ENCERTAT
    }

    if (contextParaula.conteLletraPerLletra[lletra]) {
        return ESTAT_LLETRA.MAL_COLOCAT
    }

    return ESTAT_LLETRA.ERRONI
}

export const getLletraEstat = (
    intent: string,
    contextParaula: ContextParaula
): [string, number][] =>
    intent
        .split('')
        .map((lletra, posicio) => [
            lletra,
            getEstat([lletra, posicio], contextParaula),
        ])

export const creaContextParaula = (paraula: string): ContextParaula => {
    const llistaParaula = paraula.split('')

    const conteLletraPerLletra = ABECEDARI_LLISTA.reduce(
        (prev, lletra) => ({
            ...prev,
            [lletra]: llistaParaula.includes(lletra),
        }),
        {}
    )

    return {
        paraula,
        llistaParaula,
        conteLletraPerLletra,
    }
}

export const getPostIntent = (intent: string, context: Context) => ({
    intent,
    lletraEstat: getLletraEstat(intent, context.contextParaula),
    paraulesPistes: context.paraulesPistes,
})
