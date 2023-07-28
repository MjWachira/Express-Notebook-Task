const{Router}=require('express');
const { createNote, getNotes, getNote, updateNote, deleteNote } = require('../Controllers/notebookControllers');


const notebookRouter = Router();

notebookRouter.post('/',createNote);
notebookRouter.get('/',getNotes);
notebookRouter.get('/:id',getNote);
notebookRouter.put('/:id',updateNote);
notebookRouter.delete('/:id',deleteNote);


module.exports={
    notebookRouter
}