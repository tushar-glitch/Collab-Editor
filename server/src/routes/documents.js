const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');
const auth = require('../middleware/auth');

// @route   POST api/documents
// @desc    Create a new document
// @access  Private
router.post('/', auth, documentController.createDocument);

// @route   GET api/documents
// @desc    Get all documents for user
// @access  Private
router.get('/', auth, documentController.getDocuments);

// @route   GET api/documents/:id
// @desc    Get document by ID
// @access  Private
router.get('/:id', auth, documentController.getDocument);

// @route   PUT api/documents/:id
// @desc    Update document
// @access  Private
router.put('/:id', auth, documentController.updateDocument);

// @route   DELETE api/documents/:id
// @desc    Delete document
// @access  Private
router.delete('/:id', auth, documentController.deleteDocument);

module.exports = router;
