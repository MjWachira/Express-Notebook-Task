CREATE OR ALTER PROCEDURE getOneNoteProc (@id VARCHAR(200))
AS  
    BEGIN 
        SELECT * FROM notesTable WHERE id = @id
    END