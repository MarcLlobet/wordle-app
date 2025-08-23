export type Cache = {
    diccionaris: Map<number, string[]>
    paraula: string
    clear: () => void
    setDiccionari: (llargada: number, paraules: string[]) => void
    getDiccionari: (llargada: number) => Map<number, string[]>
}

export const getCache = (): Cache => {
    const newCache = {
        diccionaris: new Map(),
        setDiccionari: (llargada: number, paraules: string[]) => {
            newCache.diccionaris.set(llargada, paraules)
        },
        getDiccionari: (llargada: number) => {
            return newCache.diccionaris.get(llargada)
        },
        paraula: '',
        setParaula: (paraula: string) => {
            newCache.paraula = paraula
        },
        clear: () => {
            newCache.diccionaris = new Map()
            newCache.paraula = ''
        },
    }
    return newCache
}

export const cache = getCache()
