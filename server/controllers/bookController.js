const Book = require("../models/Book");
const mongoose = require("mongoose");


/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
    const messages = await req.flash('info');
    const locals = {
        title:'NodeJs',
        description: 'Free NodeJs Book Management System'
    }
    try{
      const books = await Book.find({}).limit(22);
      res.render('index', { locals, messages, books });
    }catch (error) {
      console.log(error);
    }
    
}

/**
 * GET /
 * New Book Form
 */
exports.addBook = async (req, res) => {

    const locals = {
        title:'Add New Book - NodeJs',
        description: 'Free NodeJs Book Management System'
    }
    res.render('book/add', locals);

}

/**
 * POST /
 * Create New Book
 */

exports.postBook = async (req, res) => {
    console.log(req.body);

    const newBook = new Book({
        bookName: req.body.bookName,
        authorName: req.body.authorName,
        details: req.body.details,
        page: req.body.page
      });

      try {
        await Book.create(newBook);
        await req.flash("info", "New book has been added.");
        res.redirect("/");
      } catch (error) {
        console.log(error);
      }
    };
    

