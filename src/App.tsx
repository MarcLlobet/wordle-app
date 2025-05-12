import React, { useEffect, useState } from 'react'
import './App.css'

const getMillorPrimeraParaula = async () => {
    const response = await fetch(
        'https://wordle-app-d8u0.onrender.com/api/primera-paraula?llargada=5'
    )
    const json = await response.json()
    return json?.millorParaula?.paraula_original
}

function App() {
    const [millorParaula, setMillorParaula] = useState('')
    useEffect(() => {
        ;(async () => {
            const millorParaula = await getMillorPrimeraParaula()
            setMillorParaula(millorParaula)
        })()
    }, [])
    return (
        <>
            <p>
                Millor primera paraula: <span>{millorParaula}</span>
            </p>
        </>
    )
}

export default React.memo(App)
