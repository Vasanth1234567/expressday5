const mongoose=require('mongoose')
const bookSchema=new mongoose.Schema({
        isbn:{
            type:Number,
            required:true,
            unique:true
        },
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        }
    },
    {
        collection:"bookCollection"
    }
)
module.exports=mongoose.model("bookCollection",bookSchema)