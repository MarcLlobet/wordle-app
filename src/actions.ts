export const actions = {
    SET_INITIAL_MOUNT: 'SET_INITIAL_MOUNT',
    SET_PARAULA: 'SET_PARAULA',
    ADD_LLETRA: 'ADD_LLETRA',
    ESBORRA_LLETRA: 'ESBORRA_LLETRA',
    ADD_INTENT: 'ADD_INTENT',
    SET_INTENTS: 'SET_INTENTS',
    SET_WORDLE_STATE: 'SET_WORDLE_STATE',
    SET_JOC_GUANYAT: 'SET_JOC_GUANYAT',
    SET_JOC_PERDUT: 'SET_JOC_PERDUT',
    REINICIAR: 'REINICIAR',
} as const

export type ActionType = keyof typeof actions

export type Action<Type> = {
    type: ActionType
    payload?: Type
}

export type ActionDispatch<Type> = {
    (arg: Type): Action<Type>
}

export const setInitialMount: ActionDispatch<object> = (initialMount) => ({
    type: actions.SET_INITIAL_MOUNT,
    payload: initialMount,
})

export const addLletra: ActionDispatch<string> = (lletra) => ({
    type: actions.ADD_LLETRA,
    payload: lletra,
})

export const esborraLletra = () => ({
    type: actions.ESBORRA_LLETRA,
})

export const addIntent: ActionDispatch<{
    intent: string
    lletraEstat: [string, number][]
    paraulesPistes: string[]
}> = ({ intent, lletraEstat, paraulesPistes }) => ({
    type: actions.ADD_INTENT,
    payload: {
        intent,
        lletraEstat,
        paraulesPistes,
    },
})

export const setIntents: ActionDispatch<string[][]> = (intents) => ({
    type: actions.SET_INTENTS,
    payload: intents,
})

export const setWordle: ActionDispatch<string[]> = (wordle) => ({
    type: actions.ADD_INTENT,
    payload: wordle,
})

export const setParaula: ActionDispatch<string[]> = (paraula) => ({
    type: actions.SET_PARAULA,
    payload: paraula,
})

export const setJocGuanyat = () => ({
    type: actions.SET_JOC_GUANYAT,
})

export const setJocPerdut = () => ({
    type: actions.SET_JOC_PERDUT,
})

export const reiniciaJoc = () => ({
    type: actions.REINICIAR,
})
