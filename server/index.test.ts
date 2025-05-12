import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from './index'
import { EstatWordle } from './bitwise'

describe('API Endpoints', () => {
    it.skip('GET /api/primera-paraula should return millorParaula', async () => {
        const response = await request(app).get('/api/primera-paraula')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('millorParaula')
    })

    it('POST /api/filtra-paraules should return paraulesValides', async () => {
        const mockEstatWordle: EstatWordle = {
            llargada: 5,
            encerts: [],
            descartades: [],
            malColocades: [],
        }

        const response = await request(app)
            .post('/api/filtra-paraules')
            .send(mockEstatWordle)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('paraules')
        expect(Array.isArray(response.body.paraules)).toBe(true)
    })
})
