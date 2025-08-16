import { useCallback } from 'react'
import { setParaula } from '../actions'
import { useDispatchContext, useStateContext } from '../context'

export const PossiblesParaules = () => {
    const { paraulesPistes } = useStateContext()
    const dispatch = useDispatchContext()

    const handlePossibleParaulaClick = useCallback(
        (paraula: string) => {
            dispatch(setParaula(paraula.split('')))
        },
        [dispatch]
    )

    return (
        <div className="possibles-paraules">
            <ul>
                {paraulesPistes?.map((paraula, paraulaIndex) => (
                    <li key={paraulaIndex}>
                        <button
                            onClick={() => handlePossibleParaulaClick(paraula)}
                        >
                            {paraula}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
