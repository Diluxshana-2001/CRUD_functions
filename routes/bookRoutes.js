const express = require('express');
const router = express.Router();
const Book = require("../models/Books");
// const Book = require("../bookData");

//Get books
router.get('/getBooks', async (req,res)=>{
    try{
        const books = await Book.find();
        res.status(200).json(books);
    } catch(err){
        console.log(err);

        res.status(500).json({ message: "cannot read the book"})
    }
});

//Create books
router.post('/postBooks', async (req,res)=>{
    try{
        console.log('Request body:', req.body);
        const books =new Book(req.body);
        const savedBook = await books.save();
        res.status(201).json(savedBook);
    } catch(err){
        console.error("error crating book");
        res.status(500).json({message: "Book not created"})
    }
});

//Delete books
router.delete('/deleteBooks/:id', async (req,res)=>{
    try{
        const books =await Book.findByIdAndDelete( {id :req.params.id});
        if(!books){
            return res.status(404).json({error: "Book not found"})
        } 
        res.json({message: "Book deleted successfully"});
    } catch(err){
        res.status(500).json({ message: err.message})
    }
});

//Update books
router.put('/updateBook/:id', async (req,res)=>{
    try{
        const books =await Book.findOneAndUpdate({id: req.params.id}, req.body,{ new : true});
        if(!books) {
            return res.status(404).json({error: "Book not found"});
        }
        res.json({message: "Book updated successfully"});
    } catch(err){
        res.status(500).json({ message: err.message})
    }
});
module.exports = router;