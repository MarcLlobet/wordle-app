import { useCallback } from 'react'
import './teclat.css'

export const tecles = 'QWERTYUIOPASDFGHJKLÇZXCVBNM'.split('')

type TeclatProps = {
    onAddLetter: (lletra: string) => void
}

export const Teclat = ({ onAddLetter }: TeclatProps) => {
    const escriuLletra = useCallback(
        (lletra: string) => {
            const minuscula = lletra.toLowerCase()
            onAddLetter(minuscula)
        },
        [onAddLetter]
    )

    return (
        <div className="teclat">
            {tecles.map((tecla) => (
                <div key={tecla} className="tecla-wrapper">
                    <div className="tecla" onClick={() => escriuLletra(tecla)}>
                        {tecla}
                    </div>
                </div>
            ))}
        </div>
    )
}
