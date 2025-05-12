import { describe, expect, it } from 'vitest'
import {
    filtradorParaules,
    filtreRangQuantitatLletres,
    filtreNomsPropis,
    modificaACaractersValids,
    filtreCaractersAbecedari,
    filtreCaractersUnics,
} from './filtres'

describe('filtres.ts', () => {
    it('filtradorParaules aplica correctament els filtres', () => {
        const paraules = ['hola', 'adéu', 'sí', 'no']
        const filtres = [filtreRangQuantitatLletres, filtreNomsPropis]
        const resultat = filtradorParaules(paraules, filtres)
        expect(resultat).toEqual(['hola', 'adéu'])
    })

    it('filtreRangQuantitatLletres filtra correctament per longitud', () => {
        expect(filtreRangQuantitatLletres('hola')).toBe(true)
        expect(filtreRangQuantitatLletres('a')).toBe(false)
        expect(filtreRangQuantitatLletres('supercalifragilistico')).toBe(false)
    })

    it('filtreNomsPropis filtra correctament noms propis', () => {
        expect(filtreNomsPropis('hola')).toBe(true)
        expect(filtreNomsPropis('Hola')).toBe(false)
    })

    it('modificaACaractersValids normalitza correctament les paraules', () => {
        expect(modificaACaractersValids('çóàè')).toBe('çoae')
        expect(modificaACaractersValids('hólà')).toBe('hola')
    })

    it('filtreCaractersAbecedari valida correctament els caràcters', () => {
        expect(filtreCaractersAbecedari('hola')).toBe(true)
        expect(filtreCaractersAbecedari('h0la')).toBe(false)
    })

    it('filtreCaractersUnics valida correctament caràcters únics', () => {
        expect(filtreCaractersUnics('hola')).toBe(true)
        expect(filtreCaractersUnics('holaola')).toBe(false)
    })
})
