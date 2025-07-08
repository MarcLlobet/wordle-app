import { Suspense } from 'react'
import { FinalJoc } from '../context'

const finalJocMap: Record<Exclude<FinalJoc, null>, string> = {
    guanyat: 'Enhorabona campió!',
    perdut: 'Una altre vegada serà...',
}

export const ModalFinalJoc = ({ finalJoc }: { finalJoc: FinalJoc }) => {
    return (
        <Suspense fallback={<div />}>
            <div>{finalJoc ? finalJocMap[finalJoc] : "El joc s'ha acabat"}</div>
        </Suspense>
    )
}

export default ModalFinalJoc
