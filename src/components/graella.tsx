import { ReactNode, useMemo } from 'react'
import './graella.css'
import { useStateContext } from '../context'

type CellProps = {
    children: ReactNode
    activa: boolean
    status: number
}

const Cela = ({ children, activa, status }: CellProps) => {
    const classNames = useMemo(
        () =>
            [
                'cela',
                activa && 'activa',
                status === STATUS.ENCERTAT && 'encertat',
                status === STATUS.MAL_COLOCAT && 'malColocada',
                status === STATUS.DESCARTAT && 'descartat',
            ]
                .filter(Boolean)
                .join(' '),
        [activa, status]
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
    intentsEstat: [string, number][][]
    fila: ParaulaActual
    quantitatLletres: number
    quantitatIntents: number
}

export const STATUS = {
    DESCARTAT: 0,
    MAL_COLOCAT: 1,
    ENCERTAT: 2,
    EMPTY: 5,
}

export const Graella = ({
    intentsEstat,
    quantitatLletres,
    quantitatIntents,
}: GraellaProps) => {
    const { paraulaActual } = useStateContext()
    return (
        <div className="graella">
            {intentsEstat?.map((paraules, filaKey) => (
                <Fila key={filaKey}>
                    {paraules?.map(([lletra, status], lletraIndex) => (
                        <Cela
                            key={`${filaKey}--${lletraIndex}`}
                            status={status}
                            activa={false}
                        >
                            {lletra}
                        </Cela>
                    ))}
                </Fila>
            ))}
            {quantitatIntents > intentsEstat.length && (
                <Fila>
                    {Array.from({ length: quantitatLletres }).map(
                        (_, filaIndex) => (
                            <Cela
                                key={filaIndex}
                                activa={paraulaActual.length === filaIndex}
                                status={STATUS.EMPTY}
                            >
                                {paraulaActual?.[filaIndex] ?? null}
                            </Cela>
                        )
                    )}
                </Fila>
            )}
            {Array.from({
                length: quantitatIntents - (intentsEstat.length + 1),
            }).map((_, filaIndex) => (
                <Fila key={filaIndex}>
                    {Array.from({ length: quantitatLletres }).map(
                        (_, celaIndex) => (
                            <Cela
                                key={`${filaIndex}-${celaIndex}`}
                                status={STATUS.EMPTY}
                                activa={false}
                            >
                                {null}
                            </Cela>
                        )
                    )}
                </Fila>
            ))}
        </div>
    )
}
