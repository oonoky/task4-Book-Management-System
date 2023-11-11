const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 *  Book Routes 
*/
router.get('/', bookController.homepage);

router.get('/add', bookController.addBook);
router.post('/add', bookController.postBook);
router.get('/view/:id', bookController.view);
router.get('/edit/:id', bookController.edit);
router.put('/edit/:id', bookController.editPost);
router.delete('/edit/:id', bookController.deleteBook);

router.post('/search', bookController.searchBooks);

module.exports = router;