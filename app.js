const express=require('express')
const app=express()
const PORT=process.env.PORT || 3500
const router=require('./router/bookRouter')
const mongoose=require('mongoose')
app.use(express.json())
app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello World"})
})
app.use('/api/v1/books',router)
mongoose.connect(process.env.DB_URL || "mongodb+srv://root:root@myatlasclusteredu.y1e7hos.mongodb.net/?retryWrites=true&w=majority&appName=myAtlasClusterEDU")
// mongoose.connect(process.env.DB_URL)
const db=mongoose.connection
db.once('open',()=>console.log("Connected to Database Successfully"))
db.on('error',(error)=>console.log(error))
app.listen(PORT,()=>console.log(`Server started at http://localhost:${PORT}`))