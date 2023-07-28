const{v4} = require('uuid')
const notes = [];
// console.log(notes)


class Note{
    constructor(id,note_title,contentet, date_created){
        this.id=id,
        this.note_title=note_title,
        this.contentet=contentet,
        this.date_created=date_created
    }
}


const createNote = async (req, res)=>{

    try {
        const id =v4()
        //console.log(id)
        const { note_title,contentet, date_created} =req.body
        const newNote = {id, note_title,contentet, date_created }
        notes.push(newNote)
        // console.log(newNote)
        res.json({
            message:"Note created successfully",
            project: newNote
        })
    } catch(error){
        return res.json({error})}
}
const getNotes = async(req, res)=>{
    try{
        res.json({notes:notes})

    }catch(error){
        return res.json({error})}
}
const getNote = async(req, res)=>{
    try{
        const id = req.params.id
        const note= notes.filter(el =>el.id == id)
        res.json({
            note
        })
    }catch(error){
        return res.json({error})}
}
const updateNote = async(req,res)=>{
    try{
        const id=req.params.id
        const {note_title,contentet, date_created}=req.body
        const note_index= notes.findIndex(note=>note.id == id)

        if(note_index<0){
            res.json("Note not found")
        }else{
            notes[note_index]=new Note(id,note_title,contentet, date_created)
        }
        res.json({
            message:'Notebook updted successfully',
            note:notes[note_index]
        })

    }catch(error){
        return res.json({error})
    }
}
const deleteNote =async(req, res)=>{
    try{
        const id = req.params.id
        let note_index = notes.findIndex(note =>note.id==id)
        if (note_index<0){
            res.json({messagea:'Note not found'})
        }else{
            notes.splice(note_index,1)
        }
        res.json({
            message:'Note deleted succesfully'
        })
    }catch(error){
        return res.json({Error:error})
    }
}


module.exports={
 createNote,
 getNotes,
 getNote,
 updateNote,
 deleteNote
}