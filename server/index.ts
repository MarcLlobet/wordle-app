import express, { Request, Response } from 'express'
import cors from 'cors'
import { filtraParaulesValides } from './bitwise'
import { getEntradesOriginals } from './diccionari'
import { context } from './Context'
import { ABECEDARI_LLISTA, getPostIntent } from './intents'

export const app = express()
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT ?? 3000

const totesLesParaules = getEntradesOriginals()

app.get('/', (_, res) => {
    res.send('Server is running')
})

app.post('/api/initial-mount', (req: Request, res: Response) => {
    const initialMount = context.getInitialMount()
    return res.json(initialMount)
})

app.post('/api/reinicia-joc', (req: Request, res: Response) => {
    context.nouJoc()
    const initialMount = context.getInitialMount()
    return res.json(initialMount)
})

app.post('/api/intent', (req: Request, res: Response) => {
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

app.post('/api/context', (_: Request, res: Response) => {
    res.json(context)
})

app.post('/api/get-paraules-valides', (_: Request, res: Response) => {
    const paraulesValides = filtraParaulesValides(
        totesLesParaules,
        context.estat
    )
    res.json(paraulesValides)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
