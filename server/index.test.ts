import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from './index'

describe('API Endpoints', () => {
    it.skip('GET /api/primera-paraula should return millorParaula', async () => {
        const response = await request(app).get('/api/primera-paraula')

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('millorParaula')
    })
})
