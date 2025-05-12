import { dbClient } from '../connection'

type LletraPosicio = [string, number]

type SeguentParaulaType = {
    llargada: string
    encerts: LletraPosicio[]
    descartades: string[]
    malColocades: LletraPosicio[]
    limit: number
}

export const getSeguentParaula = async (input: SeguentParaulaType) => {
    const { data, error } = await dbClient.rpc('filtra_paraules', { input })

    console.log({ data, error })

    return data
}
