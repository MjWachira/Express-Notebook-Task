// console.log('hello')

const express = require('express');
const { notebookRouter } = require('./Routes/notebookRoutes');


const app = express()

app.use(express.json())
app.use('/notebook',notebookRouter)

app.use((err, req, res, next)=>{
    res.json({error:err})
})


app.listen('4300',()=>{
    console.log('server running on port 4300');
})

