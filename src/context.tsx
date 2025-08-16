import { createContext, useContext, useReducer, ReactNode } from 'react'
import { actions, Action } from './actions'

export type FinalJoc = 'guanyat' | 'perdut' | null

type AppState = {
    paraulaActual: string[]
    intents: string[][]
    intentsEstat: [string, number][][]
    quantitatLletres: number
    quantitatIntents: number
    finalJoc: FinalJoc
    paraulesPistes: string[]
}

const initialState: AppState = {
    paraulaActual: [],
    intents: [],
    intentsEstat: [],
    quantitatLletres: 5,
    quantitatIntents: 6,
    finalJoc: null,
    paraulesPistes: [],
}

type AnyAction = Action<unknown>

const appReducer = (state: AppState, action: AnyAction): AppState => {
    switch (action.type) {
        case actions.SET_INITIAL_MOUNT:
            return { ...state, ...(action.payload as object) }
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
        case actions.ADD_INTENT: {
            const { intent, lletraEstat, paraulesPistes } = action.payload
            const intentLlista = intent.split('')

            return {
                ...state,
                paraulaActual: [],
                paraulesPistes,
                intentsEstat: [...state.intentsEstat, lletraEstat],
                intents: [...state.intents, intentLlista] as string[][],
            }
        }
        case actions.SET_INTENTS:
            return { ...state, intents: action.payload as string[][] }
        case actions.SET_JOC_GUANYAT:
            return { ...state, finalJoc: 'guanyat' }
        case actions.SET_JOC_PERDUT:
            return { ...state, finalJoc: 'perdut' }
        case actions.REINICIAR:
            return { ...initialState }
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
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
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
