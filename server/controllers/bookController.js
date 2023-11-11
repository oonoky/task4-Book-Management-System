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
  let perPage = 4;
  let page = req.query.page || 1;
  try{
    const books = await Book.aggregate([{  $sort: {updateAt: -1 }}])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();
    const count = await Book.countDocuments(); // Change this line

    res.render('index', {
      locals,
      books,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};



// exports.homepage = async (req, res) => {
//     const messages = await req.flash('info');
//     const locals = {
//         title:'NodeJs',
//         description: 'Free NodeJs Book Management System'
//     }
//     try{
//       const books = await Book.find({}).limit(22);
//       res.render('index', { locals, messages, books });
//     }catch (error) {
//       console.log(error);
//     }
    
// }

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
    
/**
 * GET /
 * Book Data 
*/
exports.view = async (req, res) => {

  try {
    const book = await Book.findOne({ _id: req.params.id })

    const locals = {
      title: "View Book Data",
      description: "Free NodeJs Book Management System",
    };

    res.render('book/view', {
      locals,
      book
    })

  } catch (error) {
    console.log(error);
  }

}


/**
 * GET /
 * Edit Customer Data 
*/
exports.edit = async (req, res) => {

  try {
    const book = await Book.findOne({ _id: req.params.id })

    const locals = {
      title: "Edit Book Data",
      description: "Free NodeJs Book Management System",
    };

    res.render('book/edit', {
      locals,
      book
    })

  } catch (error) {
    console.log(error);
  }

}

/**
 * GET /
 * Update Customer Data 
*/
exports.editPost = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id,{
      bookName: req.body.bookName,
      authorName: req.body.authorName,
      page: req.body.page,
      details: req.body.details,
      updatedAt: Date.now()
    });
    await res.redirect(`/edit/${req.params.id}`);
    
    console.log('redirected');
  } catch (error) {
    console.log(error);
  }
}

/**
 * Delete /
 * Delete Customer Data 
*/
exports.deleteBook = async (req, res) => {
  try {
    await Book.deleteOne({ _id: req.params.id });
    res.redirect("/")
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get /
 * Search Book Data 
*/
exports.searchBooks = async (req, res) => {

  const locals = {
    title: "Search Book Data",
    description: "Free NodeJs Book Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const books = await Book.find({
      $or: [
        { bookName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
        { authorName: { $regex: new RegExp(searchNoSpecialChar, "i") }},
      ]
    });

    res.render("search", {
      books,
      locals
    })
    
  } catch (error) {
    console.log(error);
  }

}



