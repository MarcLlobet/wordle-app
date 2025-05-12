import { dbClient } from '../connection'
import { PostgrestResponse } from '@supabase/supabase-js'

type ParaulesPuntsType = {
    diccionari_id: number
    paraula_original: string
    paraula: string
    llargada: number
    valid: boolean
    puntuacio: number
}

export const getPrimeraParaula = async (llargada: number) => {
    const res: PostgrestResponse<ParaulesPuntsType> = await dbClient
        .from('paraules_punts')
        .select('*')
        .eq('llargada', llargada)
        .order('puntuacio', { ascending: false })
        .limit(1)

    const [primeraParaula] = res.data ?? []
    return primeraParaula
}
