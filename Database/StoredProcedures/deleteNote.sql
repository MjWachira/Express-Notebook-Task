CREATE OR ALTER PROCEDURE deleteNoteProc (@id VARCHAR(200))
AS
BEGIN 
    DELETE FROM notesTable WHERE id=@id
END