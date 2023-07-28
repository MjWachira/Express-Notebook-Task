const mssql = require('mssql')
const { sqlConfig } = require('../../Config/config')


const createNotesTable = async (res,req)=>{
    try{
        const table = `BEGIN
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
        END CATCH`

        const pool = await mssql.connect(sqlConfig)

        await pool.query(table, (err)=>{
            if(err instanceof mssql.RequestError){
                console.log({Error:err.message});

            }else{
                console.log('Table created successfully');
            }
        })
    }catch(error){
        return res({error})
    }
}
// createNotesTable()

module.exports={
    createNotesTable
}