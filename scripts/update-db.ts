import fs from 'fs'
import path from 'path'
import pool from './db' // La connexió a la DB

const WORD_FILE_PATH = path.join(__dirname, 'words.txt')

const loadWords = async () => {
    const content = fs.readFileSync(WORD_FILE_PATH, 'utf-8')
    const words = content.split('\n').map((w) => w.trim().toLowerCase())

    // Filtra per llargada
    const byLength: Record<number, string[]> = {}
    for (let len = 3; len <= 7; len++) {
        byLength[len] = words.filter((w) => w.length === len)
    }

    // Crea taules i insereix en paral·lel
    await Promise.all(
        Object.entries(byLength).map(async ([lenStr, wordList]) => {
            const len = parseInt(lenStr)
            const tableName = `words_${len}`

            // Crea taula
            await pool.query(`
      CREATE TABLE IF NOT EXISTS ${tableName} (
        id SERIAL PRIMARY KEY,
        word TEXT UNIQUE
      );
    `)

            // Inserta paraules
            const insertQuery = `
      INSERT INTO ${tableName} (word)
      VALUES ${wordList.map((_, i) => `($${i + 1})`).join(', ')}
      ON CONFLICT (word) DO NOTHING;
    `
            await pool.query(insertQuery, wordList)
            console.log(
                `Taula ${tableName} creada amb ${wordList.length} paraules`
            )
        })
    )

    console.log('Totes les taules creades i paraules inserides.')
    process.exit()
}

loadWords().catch((err) => {
    console.error('Error carregant paraules:', err)
    process.exit(1)
})
