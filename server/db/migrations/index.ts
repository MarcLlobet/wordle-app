import * as CreaTaules from './crea-taules'
import * as InsertaParaules from './inserta-paraules'

const migrations = [CreaTaules, InsertaParaules]

export const up = () =>
    migrations.map(async (migration) => await migration.up())

export const down = () =>
    migrations.toReversed().map(async (migration) => await migration.down())
