import { ComponentType, lazy, useCallback, useEffect } from 'react'
import { Teclat } from './components/teclat'
import { Graella, STATUS } from './components/graella'
import './App.css'
import { FinalJoc, useDispatchContext, useStateContext } from './context'
import {
    setInitialMount,
    addIntent,
    addLletra,
    esborraLletra,
    setJocGuanyat,
    setJocPerdut,
} from './actions'
import { useTeclaPremuda } from './hooks/useTeclaPremuda'
import { createPortal } from 'react-dom'
import { PossiblesParaules } from './components/possiblesParaules.tsx'
import { fetchBackend } from './hooks/useFetch.ts'

const ModalFinalJoc = lazy<ComponentType<{ finalJoc: FinalJoc }>>(
    () => import('./components/modalFinalJoc.tsx')
)

const getIsParaulaCorrecte = (intentsEstat) => {
    if (intentsEstat.length === 0) {
        return false
    }
    const lastIntent = intentsEstat.at(-1) ?? []

    return lastIntent.every(([, status]) => status === STATUS.ENCERTAT)
}

function App() {
    const { intents, paraulaActual, quantitatIntents, finalJoc, intentsEstat } =
        useStateContext()

    const dispatch = useDispatchContext()
    useTeclaPremuda()

    useEffect(
        function onMount() {
            const fetchInitialMount = async () => {
                const data = await fetchBackend('initial-mount')
                return data
            }

            fetchInitialMount().then((data) => {
                const { lletraEstats, paraulesPistes } = data
                dispatch(
                    setInitialMount({
                        intentsEstat: lletraEstats,
                        paraulesPistes,
                    })
                )
            })
        },
        [dispatch]
    )

    const handleOnAddLetter = useCallback(
        (letter: string) => {
            dispatch(addLletra(letter))
        },
        [dispatch]
    )

    const handleSubmitIntent = useCallback(() => {
        const fetchPostIntent = async () => {
            const response = await fetchBackend('intent', {
                intent: paraulaActual.join(''),
            })
            return response
        }

        fetchPostIntent().then((data) => {
            const { intent, lletraEstat, paraulesPistes } = data

            dispatch(
                addIntent({
                    intent,
                    lletraEstat,
                    paraulesPistes,
                })
            )
        })
    }, [dispatch, paraulaActual])

    const handleEsborraLletra = useCallback(() => {
        dispatch(esborraLletra())
    }, [dispatch])

    useEffect(() => {
        const isParaulaCorrecte = getIsParaulaCorrecte(intentsEstat)
        if (isParaulaCorrecte) {
            dispatch(setJocGuanyat())
        }
    }, [dispatch, intentsEstat, quantitatIntents])

    useEffect(() => {
        if (intents.length === quantitatIntents) {
            dispatch(setJocPerdut())
        }
    }, [intents, dispatch, quantitatIntents])

    return (
        <div className="app">
            {!!finalJoc &&
                createPortal(
                    <ModalFinalJoc finalJoc={finalJoc} />,
                    document.body
                )}
            <div className="wordle">
                <Graella
                    intentsEstat={intentsEstat}
                    fila={paraulaActual}
                    quantitatIntents={6}
                    quantitatLletres={5}
                />
                <Teclat onAddLetter={handleOnAddLetter} />
                <div className="actions">
                    <button
                        onClick={handleEsborraLletra}
                        disabled={!paraulaActual.length || !!finalJoc}
                    >
                        Remove
                    </button>
                    <button
                        onClick={handleSubmitIntent}
                        disabled={paraulaActual.length !== 5 || !!finalJoc}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <PossiblesParaules />
        </div>
    )
}

export default App
