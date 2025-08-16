import { getCache } from './cache'
import { describe, it, expect } from 'vitest'

describe('cache', () => {
    it('saves diccionaris', () => {
        const cache = getCache()
        cache.diccionaris.set(5, ['a', 'b', 'c'])
        expect(cache.diccionaris.get(5)).toEqual(['a', 'b', 'c'])
    })

    it('save paraula', () => {
        const cache = getCache()
        cache.paraula = 'abc'
        expect(cache.paraula).toEqual('abc')
    })

    it('clears diccionaris', () => {
        const cache = getCache()
        cache.diccionaris.set(5, ['a', 'b', 'c'])
        cache.clear()

        expect(cache.diccionaris.get(5)).toBeUndefined()
    })

    it('clears paraula', () => {
        const cache = getCache()
        cache.paraula = 'abc'
        cache.clear()

        expect(cache.paraula).toEqual('')
    })
})
