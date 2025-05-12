import { sqlQuery } from '../connection'
import { creaFuncioFiltraParaules } from '../sql/crea-funcio-filtra-paraules'
import { creaFuncioRefreshTot } from '../sql/crea-funcio-refresh-tot'
import { creaIndexs } from '../sql/crea-indexs'
import { creaParaulesPunts } from '../sql/crea-paraules-punts'
import { creaTaules } from '../sql/crea-taules'
import { destrueixDatabasesQueries } from '../sql/destrueix-databases-queries'

const creaDatabaseQueries = [
    creaTaules,
    creaFuncioRefreshTot,
    creaParaulesPunts,
    creaFuncioFiltraParaules,
    creaFuncioFiltraParaules,
    creaIndexs,
].join('\n\n')

export const up = async () => {
    await sqlQuery(creaDatabaseQueries)
}

export const down = async () => {
    await sqlQuery(destrueixDatabasesQueries)
}
