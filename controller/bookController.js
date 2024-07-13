const bookData=require('../datas/bookData')
const bookModel=require('../models/bookModel')
const getAllBooks=async(req,res)=>{
    try {
        const books=await bookModel.find()
        if(books.length==0){
            const inserteddata=await bookModel.insertMany(bookData)
            return res.status(200).json(inserteddata)
        }
        res.status(200).json(books)   
    }
    catch (error) {
        res.status(500).json({error:error.message})
    }
}
const getBookByIsbn=async(req,res)=>{
    const isbntofetch=req.params.isbn
    try {
        const bookbyisbn=await bookModel.find({isbn:isbntofetch})
        if(bookbyisbn.length==0){
            res.status(404).json({message:"Invalid ISBN."})
        }
        else{
            // console.log(bookbyisbn)
            res.status(200).json(bookbyisbn)
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
const addNewBook=async(req,res)=>{
    const updateBook=req.body
    const isbntofetch=req.body.isbn
    try {
        // console.log(data)
        const existindData=await bookModel.findOne({isbn:isbntofetch})
        console.log(existindData)
        if(existindData){
            return res.status(409).json({message:"Conflict in Data"})
        }
        const data=await bookModel.create(updateBook)
        return res.status(201).json({message:"Added Successfully"})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
const updataBook=async(req,res)=>{
    const isbntofetch=Number(req.params.isbn)
    const updateBookDetails=req.body
    try{
        const validation=await bookModel.findOne({isbn:isbntofetch})
        if(validation){
            const newdata=await bookModel.findOneAndUpdate({isbn:isbntofetch},updateBookDetails)
            return res.status(200).json({message:"Updated Successfully"})
        }
        else{
            return res.status(404).json({message:"Invalid Id"})
        }
    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
}
const deleteBook=async(req,res)=>{
    const isbntofetch=Number(req.params.isbn)
    try {
         const data=await bookModel.findOne({isbn:isbntofetch})
         if(data){
            const deletes=await bookModel.findOneAndDelete({isbn:isbntofetch})
            return res.status(200).json({message:"Deleted Successfully"})
         }
         else{
            return res.status(404).json({message:"Invalid Id."})
         }
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}
module.exports={getAllBooks,getBookByIsbn,addNewBook,updataBook,deleteBook}