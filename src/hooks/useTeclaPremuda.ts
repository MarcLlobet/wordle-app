import { useDispatchContext, useStateContext } from '../context'
import { addIntent, addLletra, esborraLletra, setParaula } from '../actions'
import { tecles } from '../components/teclat'
import { useEffect } from 'react'
const teclesMinuscules = tecles.map((lletra) => lletra.toLowerCase())

export function useTeclaPremuda() {
    const { paraulaActual, quantitatLletres, finalJoc } = useStateContext()
    const dispatch = useDispatchContext()

    useEffect(() => {
        const keyDownHandler = (e: globalThis.KeyboardEvent) => {
            if (
                paraulaActual.length < quantitatLletres &&
                teclesMinuscules.includes(e.key)
            ) {
                dispatch(addLletra(e.key))
            }

            if (
                paraulaActual.length === quantitatLletres &&
                e.key === 'Enter'
            ) {
                dispatch(addIntent(paraulaActual))
                dispatch(setParaula([]))
            }

            if (paraulaActual.length && e.key === 'Backspace') {
                dispatch(esborraLletra())
            }
        }

        if (!finalJoc) {
            document.addEventListener('keydown', keyDownHandler)
        }

        return () => {
            document.removeEventListener('keydown', keyDownHandler)
        }
    }, [dispatch, paraulaActual, quantitatLletres, finalJoc])
}
