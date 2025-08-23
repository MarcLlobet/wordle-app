import { Suspense, useCallback } from 'react'
import { FinalJoc, useDispatchContext } from '../context'
import './modalFinalJoc.css'
import { fetchBackend } from '../hooks/useFetch'
import { reiniciaJoc } from '../actions'

const finalJocMap: Record<Exclude<FinalJoc, null>, string> = {
    guanyat: 'Enhorabona crack!',
    perdut: 'Una altre vegada serà...',
}

const ModalFinalJoc = ({ finalJoc }: { finalJoc: FinalJoc }) => {
    const dispatch = useDispatchContext()
    const handleReiniciaJoc = useCallback(() => {
        const reiniciar = async () => {
            const data = await fetchBackend('reinicia-joc')
            return data
        }

        reiniciar().then(() => {
            dispatch(reiniciaJoc())
        })
    }, [dispatch])

    return (
        <Suspense fallback={<div>Fi</div>}>
            <div className="modalWrapper">
                <div className="modalContent">
                    {finalJoc ? finalJocMap[finalJoc] : "El joc no s'ha acabat"}
                    <button onClick={handleReiniciaJoc}>Reinicia Joc</button>
                </div>
            </div>
        </Suspense>
    )
}

export default ModalFinalJoc
