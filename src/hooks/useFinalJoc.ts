import { useEffect } from 'react'
import { setJocGuanyat, setJocPerdut } from '../actions'
import { useDispatchContext, useStateContext } from '../context'

export const useFinalJoc = () => {
    const { paraulaCorrecte, quantitatIntents, intents, finalJoc } =
        useStateContext()
    const dispatch = useDispatchContext()

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

    return finalJoc
}
