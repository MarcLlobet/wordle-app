import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { getPrimeraParaula } from './db/queries/getPrimeraParaula'
import { getSeguentParaula } from './db/queries/getSeguentParaula'

export const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT ?? 3000

app.get('/api/primera-paraula', async (req, res) => {
    const llargadaQuery = req.query?.llargada
        ? Number.parseInt(req.query.llargada as string, 10)
        : 5

    const millorParaula = await getPrimeraParaula(llargadaQuery)
    res.json({ millorParaula })
})

app.post('/api/filtra-paraules', async (req, res) => {
    console.log(req.body)
    const paraules = await getSeguentParaula(req.body)
    res.json({ paraules })
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
