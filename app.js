import express from "express"
import * as db from './util/database.js'

const PORT = 8080
const app = express()
app.use(express.json())

app.get("/notes", (req,res) => {
    try{
    const notes = db.getNote()
    res.status(200).json(notes)
}catch(err){
    res.status(500).json({message: `${err}`})
}
})

app.get("/notes/:id", (req,res) => {
    try{
        const note = db.getNote(req.params.id)
        if(!note){
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json(note)
    }catch(err){
        res.status(500).json({message: `${err}`})
    }
})

app.post("/notes", (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const saveNote = db.saveNote(title, content); 
        if (saveNote.changes != 1) {
            return res.status(501).json({ message: "Notes saved failed" });
        }
        res.status(201).json({ id: saveNote.lastInsertRowid, title, content });
    } catch (err) {
        res.status(500).json({ message: `${err}` });
    }
});

app.put("/notes/:id", (req,res) => {
    try{
        const {title, content} = req.body
        if(!title || !content){
            return res.status(400).json({message: "Title and content are required"})
        }
        const id = req.params.id
        const updateNote = db.updateNote(id,title, content)
        if(updateNote.changes != 1){
            return res.status(501).json({message: "Notes updated faild"})
        }
        res.status(200).json({id,title, content})
    }catch(err){
        res.status(500).json({message: `${err}`})
    }
})

app.delete("/notes/:id", (req,res) => {
    try{
        const deleteNote = db.deleteNote(req.params.id)
        if(deleteNote.changes != 1){
            return res.status(404).json({message: "Note deleted faild"})
        }
        res.status(204).json({message: "Note deleted"})
    }catch(err){
        res.status(500).json({message: `${err}`})
    }
})

app.listen(PORT, () => {
    console.log(`Server runs on port${PORT}` )
})

