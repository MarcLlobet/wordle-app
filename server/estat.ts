import { EstatWordle } from './bitwise'

export const getEstatByIntent = (
    intent: string,
    paraula: string,
    estat: EstatWordle
) =>
    intent.split('').reduce(
        (prev, lletra, lletraIndex) =>
            ({
                ...prev,
                llargada: estat.llargada,
                encerts:
                    paraula[lletraIndex] === lletra
                        ? [...(prev?.encerts ?? []), [lletra, lletraIndex]]
                        : prev.encerts,
                malColocades:
                    paraula[lletraIndex] !== lletra && paraula.includes(lletra)
                        ? [...(prev?.malColocades ?? []), [lletra, lletraIndex]]
                        : prev.malColocades,
                descartades:
                    !prev?.descartades?.includes(lletra) &&
                    !paraula.includes(lletra)
                        ? Array.from(
                              new Set([...(prev?.descartades ?? []), lletra])
                          )
                        : prev.descartades,
            }) as EstatWordle,
        estat
    )
