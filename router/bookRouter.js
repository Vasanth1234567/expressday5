const express=require('express')
const { getAllBooks, getBookByIsbn, addNewBook, updataBook, deleteBook } = require('../controller/bookController')
const router=express.Router()
router.get("/getAllBooks",getAllBooks)
router.get("/getBookByIsbn/:isbn",getBookByIsbn)
router.post("/addNewBook",addNewBook)
router.put("/updateBook/:isbn",updataBook)
router.delete("/deleteBook/:isbn",deleteBook)
module.exports=router