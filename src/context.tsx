import { createContext, useContext, useReducer, ReactNode } from 'react'
import { actions, Action } from './actions'
import { EstatWordle } from '../server/bitwise'

export type FinalJoc = 'guanyat' | 'perdut' | null

type AppState = {
    paraulaCorrecte: string
    paraulaActual: string[]
    intents: string[][]
    quantitatLletres: number
    quantitatIntents: number
    wordle: EstatWordle
    finalJoc: FinalJoc
    ultimIntent: string | null
}

const initialState: AppState = {
    paraulaCorrecte: 'boira',
    paraulaActual: [],
    intents: [],
    quantitatLletres: 5,
    quantitatIntents: 6,
    wordle: {
        llargada: 5,
        encerts: [],
        descartades: [],
        malColocades: [],
    },
    finalJoc: null,
    ultimIntent: null,
}

type AnyAction = Action<unknown>

const appReducer = (state: AppState, action: AnyAction): AppState => {
    switch (action.type) {
        case actions.SET_PARAULA:
            return { ...state, paraulaActual: action.payload as string[] }
        case actions.ADD_LLETRA:
            return {
                ...state,
                paraulaActual: [
                    ...state.paraulaActual,
                    action.payload as string,
                ],
            }
        case actions.ESBORRA_LLETRA:
            return {
                ...state,
                paraulaActual: state.paraulaActual.slice(
                    0,
                    state.paraulaActual.length - 1
                ),
            }
        case actions.ADD_INTENT:
            return {
                ...state,
                intents: [...state.intents, action.payload] as string[][],
                ultimIntent: (action.payload as string[]).join(''),
            }
        case actions.SET_INTENTS:
            return { ...state, intents: action.payload as string[][] }
        case actions.SET_WORDLE_STATE:
            return { ...state, wordle: action.payload as EstatWordle }
        case actions.SET_JOC_GUANYAT:
            return { ...state, finalJoc: 'guanyat' }
        case actions.SET_JOC_PERDUT:
            return { ...state, finalJoc: 'perdut' }
        default:
            return state
    }
}

const StateContext = createContext<AppState>(initialState)
const DispatchContext = createContext<React.Dispatch<AnyAction> | undefined>(
    undefined
)

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer<AppState, AnyAction>(
        appReducer,
        initialState
    )

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export const useStateContext = () => {
    const context = useContext(StateContext)
    if (!context) {
        throw new Error('useStateContext must be used within an AppProvider')
    }
    return context
}

export const useDispatchContext = () => {
    const context = useContext(DispatchContext)
    if (!context) {
        throw new Error('useDispatchContext must be used within an AppProvider')
    }
    return context
}
