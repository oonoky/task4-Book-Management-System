const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

/**
 *  Book Routes 
*/
router.get('/', bookController.homepage);

router.get('/add', bookController.addBook);
router.post('/add', bookController.postBook);

module.exports = router;