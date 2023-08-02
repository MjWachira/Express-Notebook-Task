CREATE OR ALTER PROCEDURE updateNoteProc (
 @id VARCHAR(200),
 @note_title VARCHAR(500), 
 @contentet VARCHAR(500), 
 @date_created DATE)
AS
    BEGIN
        UPDATE notesTable SET id= @id, 
         note_title = @note_title,
         contentet = @contentet,  
         date_created = @date_created
     WHERE id= @id
    END