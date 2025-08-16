import { getParaulaAleatoria, getParaules } from './diccionari'
import { ContextParaula, creaContextParaula, getLletraEstat } from './intents'
import { EstatWordle, filtraParaulesValides } from './bitwise'
import { getEstatByIntent } from './estat'

export class Context {
    totesLesParaules: string[]

    paraula!: string
    contextParaula!: ContextParaula
    intents!: string[]
    estat!: EstatWordle
    paraulesRestants!: string[]
    paraulesPistes!: string[]
    lletraEstats!: [string, number][][]

    constructor() {
        this.totesLesParaules = getParaules()
        this.nouJoc()
    }

    nouJoc() {
        this.paraula = getParaulaAleatoria(this.totesLesParaules)
        this.paraulesRestants = this.totesLesParaules
        this.contextParaula = creaContextParaula(this.paraula)
        this.intents = []
        this.estat = {
            llargada: 5,
            encerts: [],
            malColocades: [],
            descartades: [],
        } as EstatWordle
        this.paraulesPistes = this.paraulesRestants.slice(0, 25)
        this.lletraEstats = []
    }

    afegeixIntent(intent: string) {
        this.intents.push(intent)
        const lletraEstat = getLletraEstat(intent, this.contextParaula)
        this.lletraEstats.push(lletraEstat)
        const estatWordle = getEstatByIntent(intent, this.paraula, this.estat)
        context.estat = estatWordle
        const restants = filtraParaulesValides(
            this.paraulesRestants,
            estatWordle
        )
        this.paraulesRestants = restants
        this.paraulesPistes = this.paraulesRestants.slice(0, 5)
        return lletraEstat
    }

    getInitialMount() {
        return {
            lletraEstats: this.lletraEstats,
            paraulesPistes: this.paraulesPistes,
        }
    }
}

export const context = new Context()
