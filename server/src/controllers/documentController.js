const Document = require('../models/Document');

exports.createDocument = async (req, res) => {
  try {
    const { title } = req.body;
    const newDocument = new Document({
      title: title || 'Untitled Document',
      owner: req.user.id,
      collaborators: []
    });

    const document = await newDocument.save();
    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getDocuments = async (req, res) => {
  try {
    // Find documents where user is owner OR collaborator
    const documents = await Document.find({
      $or: [
        { owner: req.user.id },
        { collaborators: req.user.id }
      ]
    }).sort({ lastModified: -1 });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    // Check access
    if (document.owner.toString() !== req.user.id && !document.collaborators.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(document);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Document not found' });
    }
    res.status(500).send('Server Error');
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const { title, content } = req.body;
    let document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    // Check access
    if (document.owner.toString() !== req.user.id && !document.collaborators.includes(req.user.id)) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    if (title) document.title = title;
    if (content) document.content = content;
    document.lastModified = Date.now();

    await document.save();
    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    // Only owner can delete
    if (document.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await document.deleteOne();
    res.json({ msg: 'Document removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
