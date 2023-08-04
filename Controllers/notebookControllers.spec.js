import mssql from 'mssql'
import { createNote, deleteNote, getNote, getNotes, updateNote } from './notebookControllers'


const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
}

describe("Nobotebook Controller",()=>{

    describe("creating a new note",()=>{
        it("should create a note succesfully", async()=>{
            const noteId="etddtfygtuyk62737366363"
            const newNote={
                note_title:"learned node",
                contentet:"created endpoints using express",
                date_created:"2023-07-28"
            }
            const req = {
                params:{id:noteId},
                body:newNote
            }
        
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected:[1] 
                })

            })
            await createNote(req,res)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({
                    message: "note created successfully"
                })
        })

        it("should retun an error if note failed to create", async()=>{
            const noteId="etddtfygtuyk62737366363"
            const newNote={
                note_title:"learned node",
                contentet:"created endpoints using express",
                date_created:"2023-07-28"
            }
            const req = {
                params:{id:noteId},
                body:newNote
            }
            
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected:[0] 
              })
            })
            await createNote(req,res)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                    message: "creation failed"
             })
         })
    })
    describe("Gets all notes", ()=>{
        it("should return all notes" , async()=>{
            const mockNotes =[
               {
                    id: "244fcc13-d98b-4879-8d10-a35bcf082f01",
                    note_title: "Dependencies",
                    contentet: "Installed and configured dependences using express",
                    date_created: "2023-07-28T00:00:00.000Z"
                },
                {
                    id: "244fcc13-d98b-4879-8d10-a35bcf082f01",
                    note_title: "Dependencies",
                    contentet: "Installed and configured dependences using express",
                    date_created: "2023-07-28T00:00:00.000Z"
                }]
            const req = {}
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: mockNotes
                })
            })
            await getNotes(req, res)
            //expect(jest.fn(res.status)).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({Notes:mockNotes})
        })
    })
    describe("Getting note by ID", ()=>{
        it ("should return  note with provded id", async()=>{
            const noteId = '244fcc13-d98b-4879-8d10-a35bcf082f01'
            const mockNote = {
                    id: "244fcc13-d98b-4879-8d10-a35bcf082f01",
                    note_title: "Dependencies",
                    contentet: "Installed and configured dependences using express",
                    date_created: "2023-07-28T00:00:00.000Z"
              }
            const req = {
                params: {id: noteId}
            }
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: [mockNote]
                })
            })
            await getNote(req, res)
            expect(res.json).toHaveBeenCalledWith({note: [mockNote]})
        })

    })
    describe("updating an existing note",()=>{
        it("should update a note succesfully", async()=>{
            const noteId="etddtfygtuyk62737366363"
            const newNote={
                note_title:"learned node",
                contentet:"created endpoints using express",
                date_created:"2023-07-28"
            }
            const req = {
                params:{id:noteId},
                body:newNote
            }
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected:[1] 
                })
            })
            await updateNote(req,res)
            expect(res.json).toHaveBeenCalledWith({
                    message: "note updated successfully"
                })
        })
        it("should retun an error if note does not exist", async()=>{
            const noteId="etddtfygtuyk62737366363"
            const newNote={
                note_title:"learned node",
                contentet:"created endpoints using express",
                date_created:"2023-07-28"
            }
            const req = {
                params:{id:noteId},
                body:newNote
            }
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected:[0] 
              })
            })
            await updateNote(req,res)
            expect(res.json).toHaveBeenCalledWith({
                    message: "note not found"
             })
        })
    })
    describe("Deleting a note", ()=>{

        it("should delete the note successfully", async()=>{
            const noteId = 'rjsfeskrdz4554edffffgg'
            const req = {
                params:{id: noteId}
            }
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })
            await deleteNote(req, res)
            expect(res.json).toHaveBeenCalledWith({
                message: 'note deleted successfully'
            })
        })
        it("should return an error when a note is not found", async()=>{
            const noteId = 'vghjklkjhbvcfghjkjhghj654r'
            const req = {
                params:{id: noteId}
            }
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [0]
                })
            })
            await deleteNote(req, res)
            expect(res.json).toHaveBeenCalledWith({
                message: 'note not found'
            })
        })
    })

})