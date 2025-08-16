import { useEffect, useState } from 'react'

const BACKEND_URL = 'http://localhost:3000/api'

export const fetchBackend = async (url: string, options?: object) => {
    const request = new Request(`${BACKEND_URL}/${url}`, {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        signal: AbortSignal.timeout(5000),
        ...(options && { body: JSON.stringify(options) }),
    })

    const response = await fetch(request)
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }
    const json = await response.json()
    return json
}

export const useFetchParaulesValides = (options?: object) => {
    const [paraulesValides, setParaulesValides] = useState<string[]>()

    useEffect(function onMount() {
        const fetchData = async () => {
            const data: Promise<string[]> = await fetchBackend(
                'paraules-valides',
                options
            )
            return data
        }

        fetchData().then((data) => {
            setParaulesValides(data)
        })
    }, [])

    return paraulesValides
}
