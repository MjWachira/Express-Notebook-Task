CREATE OR ALTER PROCEDURE createNotePROC(@id VARCHAR(200),
            @note_title VARCHAR(200),
            @contentet VARCHAR(500), 
            @date_created DATE)
AS
BEGIN
    INSERT INTO notesTable(
            id,
            note_title,
            contentet, 
            date_created) VALUES (@id,
            @note_title,
            @contentet, 
            @date_created)
END

SELECT * FROM notesTable

-- DROP TABLE notesTable;