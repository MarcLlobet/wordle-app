import { createClient } from '@supabase/supabase-js'

const DB_URL = process.env?.DB_URL ?? ''
const DB_API_KEY = process.env?.DB_API_KEY ?? ''
const DB_SERVICE_ROLE = process.env?.DB_SERVICE_ROLE ?? ''

export const dbClient = createClient(DB_URL, DB_API_KEY)

export async function sqlQuery(sql: string) {
    const res = await fetch(`${DB_URL}/rest/v1/rpc/execute_sql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            apikey: DB_SERVICE_ROLE,
            Authorization: `Bearer ${DB_SERVICE_ROLE}`,
        },
        body: JSON.stringify({ sql }),
    })

    const data = await res.text()
    if (!res.ok) {
        console.error('Error amb la query:', data)
    } else {
        console.log('La query ha funcionat', data, res)
    }
    return res
}
