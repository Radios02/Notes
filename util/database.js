import Database from "better-sqlite3"
const db = new Database('./data/database.sqlite')

db.prepare('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, content STRING)').run()

export const getNotes = () => db.prepare(`SELECT * FROM notes`).all()
export const getNote = (id) => db.prepare(`SELECT * FROM notes WHERE id = ?`).get(id)
export const saveNote = (title, content) => db.prepare(`INSERT INTO notes (title, content) VALUES (?, ?)`).run(title, content)
export const updateNote = (id, title, content) => db.prepare(`UPDATE notes SET title = ?, content = ? WHERE id = ?`).run(title, content, id)
export const deleteNote = (id) => db.prepare(`DELETE FROM notes WHERE id = ?`).run(id)

const notes = [
    { title: 'dfsdgsg', content: 'wfawf' },
    { title: 'dgseg', content: 'afa' },
    { title: 'awa', content: 'fe' },
    { title: 'hemg', content: 'tjeg' }
]

notes.forEach(note => {
    const existingNote = db.prepare(`SELECT * FROM notes WHERE title = ? AND content = ?`).get(note.title, note.content)
    if (!existingNote) {
        saveNote(note.title, note.content)
    }
})