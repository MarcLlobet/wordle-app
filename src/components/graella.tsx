import { ReactNode, useMemo } from 'react'
import './graella.css'

type CellProps = {
    children: ReactNode
    activa: boolean
    encertat: boolean
    malColocada: boolean
    descartat: boolean
}

const Cela = ({
    children,
    activa,
    encertat,
    malColocada,
    descartat,
}: CellProps) => {
    const classNames = useMemo(
        () =>
            [
                'cela',
                activa && 'activa',
                encertat && 'encertat',
                malColocada && 'malColocada',
                descartat && 'descartat',
            ]
                .filter(Boolean)
                .join(' '),
        [activa, encertat, malColocada, descartat]
    )

    return (
        <div className={classNames}>
            <span className="lletra">{children}</span>
        </div>
    )
}

const Fila = ({ children }: { children: ReactNode }) => (
    <div className="fila">{children}</div>
)

type ParaulaActual = (string | null)[]

type GraellaProps = {
    intents: string[]
    fila: ParaulaActual
    quantitatLletres: number
    quantitatIntents: number
    paraulaCorrecte: string
}

export const Graella = ({
    paraulaCorrecte,
    intents,
    fila,
    quantitatLletres,
    quantitatIntents,
}: GraellaProps) => {
    return (
        <div className="graella">
            {intents?.map((lletres, filaKey) => (
                <Fila key={filaKey}>
                    {lletres?.map((lletra, lletraIndex) => (
                        <Cela
                            key={lletraIndex}
                            encertat={paraulaCorrecte[lletraIndex] === lletra}
                            malColocada={
                                paraulaCorrecte.includes(lletra) &&
                                paraulaCorrecte[lletraIndex] !== lletra
                            }
                            descartat={!paraulaCorrecte.includes(lletra)}
                        >
                            {lletra}
                        </Cela>
                    ))}
                </Fila>
            ))}
            {quantitatIntents > intents.length && (
                <Fila>
                    {Array.from({ length: quantitatLletres }).map(
                        (_, filaIndex) => (
                            <Cela
                                key={filaIndex}
                                activa={fila.length === filaIndex}
                            >
                                {fila?.[filaIndex] ?? null}
                            </Cela>
                        )
                    )}
                </Fila>
            )}
            {Array.from({
                length: quantitatIntents - (intents.length + 1),
            }).map((_, filaIndex) => (
                <Fila key={filaIndex}>
                    {Array.from({ length: quantitatLletres }).map(
                        (_, celaIndex) => (
                            <Cela key={`${filaIndex}-${celaIndex}`}>
                                {null}
                            </Cela>
                        )
                    )}
                </Fila>
            ))}
        </div>
    )
}
