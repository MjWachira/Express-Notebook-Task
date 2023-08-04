const{v4} = require('uuid');
const mssql = require('mssql');
const { createNotesTable } = require('../Database/Tables/createNotesTable');
const { sqlConfig } = require('../Config/config');
// const notes = [];
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
        const pool = await mssql.connect(sqlConfig)
        const result =(await pool.request()
        .input('id',id)
        .input('note_title',mssql.VarChar,note_title)
        .input('contentet',mssql.VarChar,contentet)
        .input('date_created',mssql.Date,date_created)
        .execute('createNotePROC'))
        if(result.rowsAffected [0]== 1){
            return res.status(200).json({
                message: "note created successfully",
            })  
            }else{
                return res.status(400).json({message: "creation failed"})
            } 
    } catch(error){
        return res.json({error})}
}
const getNotes = async(req, res)=>{
    try{
        const pool = await (mssql.connect(sqlConfig))
        const allNotes = (await pool.request().execute('getAllNotesProc')).recordset
        res.status(200).json({Notes: allNotes})

    }catch(error){
        return res.status(400).json({error})}
}
const getNote = async(req, res)=>{
    try{
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)
        const note = (await pool.request().input('id', id).execute('getOneNoteProc')).recordset
        res.json({
            note:note
        })
    }catch(error){
        return res.json({error})}
}
const updateNote = async(req,res)=>{
    try{
        const {id} = req.params
        const { note_title,contentet, date_created} =req.body
        const pool = await mssql.connect(sqlConfig)
        const result = (await pool.request()
        .input('id',id)
        .input('note_title',mssql.VarChar,note_title)
        .input('contentet',mssql.VarChar,contentet)
        .input('date_created',mssql.Date,date_created)
        .execute('updateNoteProc'));
        console.log(result);

        if(result.rowsAffected == 1){
            res.json({
                message: 'note updated successfully'
            })
        }else{
            res.json({
                message: 'note not found'
            })
        }
    }catch(error){
        return res.json({error})
    }
}
const deleteNote =async(req, res)=>{
    try{
        
        const id = req.params.id
        const pool = await mssql.connect(sqlConfig)
        const result = await pool.request()
        .input('id', id)
        .execute('deleteNoteProc')
        if(result.rowsAffected == 1){
            res.json({
                    message: 'note deleted successfully'
            })
        }else{
            res.json({
                message: 'note not found'
        })
        }
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