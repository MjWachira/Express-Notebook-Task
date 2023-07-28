BEGIN
    TRY 
        CREATE TABLE notesTable(
            id VARCHAR(200) PRIMARY KEY,
            note_title VARCHAR(200) NOT NULL,
            contentet VARCHAR(500) NOT NULL, 
            date_created DATE NOT NULL
        )
    END TRY
BEGIN 
    CATCH 
        THROW 50001,'Table already exists!',1;
    END CATCH