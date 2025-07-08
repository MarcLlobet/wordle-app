import { ComponentType, lazy, useCallback, useEffect } from 'react'
import { Teclat } from './components/teclat'
import { Graella } from './components/graella'
import './App.css'
import { FinalJoc, useDispatchContext, useStateContext } from './context'
import {
    addIntent,
    addLletra,
    esborraLletra,
    setJocGuanyat,
    setJocPerdut,
    setParaula,
} from './actions'
import { useTeclaPremuda } from './hooks/useTeclaPremuda'
import { useFinalJoc } from './hooks/useFinalJoc'
import { createPortal } from 'react-dom'

function App() {
    const {
        intents,
        paraulaActual,
        paraulaCorrecte,
        finalJoc,
        quantitatIntents,
    } = useStateContext()
    const dispatch = useDispatchContext()
    useTeclaPremuda()
    useFinalJoc()

    const ModalFinalJoc = lazy<ComponentType<{ finalJoc: FinalJoc }>>(
        () => import('./components/modalFinalJoc.tsx')
    )

    const handleOnAddLetter = useCallback(
        (letter: string) => {
            dispatch(addLletra(letter))
        },
        [dispatch]
    )

    const handleSubmitIntent = useCallback(() => {
        dispatch(addIntent(paraulaActual))
        dispatch(setParaula([]))
    }, [dispatch, paraulaActual])

    const handleEsborraLletra = useCallback(() => {
        dispatch(esborraLletra())
    }, [dispatch])

    useEffect(() => {
        if (intents.at(-1)?.join('') === paraulaCorrecte) {
            dispatch(setJocGuanyat())
        }
    }, [paraulaCorrecte, dispatch, intents])

    useEffect(() => {
        if (intents.length === quantitatIntents) {
            dispatch(setJocPerdut())
        }
    }, [intents, dispatch, quantitatIntents])

    return (
        <>
            {!!finalJoc &&
                createPortal(
                    <ModalFinalJoc finalJoc={finalJoc} />,
                    document.body
                )}
            <Graella
                paraulaCorrecte={paraulaCorrecte}
                intents={intents}
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
        </>
    )
}

export default App
