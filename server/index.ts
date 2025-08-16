import express from 'express'
import cors from 'cors'
import { EstatWordle, filtraParaulesValides } from './bitwise'
import { getEntradesOriginals, getParaulaAleatoria } from './diccionari'
import { context } from './Context'
import { ABECEDARI_LLISTA, getPostIntent } from './intents'

export const app = express()
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())

const PORT = process.env.PORT ?? 3000

app.get('/', (_, res) => {
    res.send('Server is running')
})

app.post('/api/initial-mount', (req, res) => {
    const initialMount = context.getInitialMount()
    return res.json(initialMount)
})

app.post('/api/reinicia-joc', (req, res) => {
    context.nouJoc()
    const initialMount = context.getInitialMount()
    return res.json(initialMount)
})

app.post('/api/intent', (req, res) => {
    const intentsRestants = 6 - context.intents.length

    if (!intentsRestants) {
        return res.send('No hi ha intents restants')
    }

    const hasIntentJaEncertat = context.intents.some(
        (paraula) => paraula === context.contextParaula.paraula
    )

    if (hasIntentJaEncertat) {
        return res.send('Ja has encertat anteriorment')
    }

    const { intent = '' }: { intent: string } = req.body ?? {}

    if (typeof intent !== 'string') {
        return res.send("El format de l'intent es incorrecte")
    }

    if (intent.length !== 5) {
        return res.send("La llargada de l'intent es incorrecte")
    }

    const hasAllCaractersValids = intent
        .split('')
        .every((lletra) => ABECEDARI_LLISTA.includes(lletra))

    if (!hasAllCaractersValids) {
        return res.send("Els caràcters de l'intent són incorrectes")
    }

    context.afegeixIntent(intent)

    const intentData = getPostIntent(intent, context)

    return res.json(intentData)
})

app.post('/api/context', (req, res) => {
    res.json(context)
})

app.post('/api/get-paraules-valides', (req, res) => {
    const paraulesValides = filtraParaulesValides(
        totesLesParaules,
        context.estat
    )
    res.json(paraulesValides)
})

app.post('/api/paraules-valides', (req, res) => {
    const estatWordle = req.body

    const paraulesValides = filtraParaulesValides(
        totesLesParaules,
        estatWordle as EstatWordle
    )
    res.json(paraulesValides)
})

app.get('/diccionari', (_, res) => {
    const totesLesParaules = getEntradesOriginals()
    res.send(totesLesParaules)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
