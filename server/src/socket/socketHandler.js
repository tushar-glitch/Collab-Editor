const Document = require('../models/Document');

module.exports = (io, socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join-document', async (documentId) => {
    socket.join(documentId);
    console.log(`Socket ${socket.id} joined document ${documentId}`);
    
    // Load document from DB (optional here if client fetches it via API first)
    // But good for ensuring fresh state if needed
  });

  socket.on('send-changes', (delta) => {
    // Broadcast changes to everyone else in the room
    // delta contains the changes made by the user
    // We expect the client to send { documentId, delta } or just delta if room context is implicit
    // But standard practice: socket.to(documentId).emit('receive-changes', delta)
    
    // Assuming the client sends the room ID with the changes or we track it
    // For simplicity, let's assume the client sends { documentId, delta }
    // But wait, 'send-changes' usually just sends the delta if we are already in the room.
    // Let's rely on the client sending the delta. 
    // However, we need to know WHICH room to broadcast to.
    // A common pattern is to store the documentId on the socket object upon joining.
    
    // Let's refine 'join-document' to store the ID
  });
  
  // Refined implementation
  socket.on('get-document', async (documentId) => {
    const document = await Document.findById(documentId);
    socket.join(documentId);
    socket.emit('load-document', document.content);

    socket.on('send-changes', (delta) => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('cursor-move', (range) => {
        // In a real app, we'd map socket.id to a user name/color
        socket.broadcast.to(documentId).emit('receive-cursor-move', { 
            range, 
            id: socket.id,
            name: 'User ' + socket.id.substr(0, 4) // Placeholder name
        });
    });

    socket.on('save-document', async (content) => {
      await Document.findByIdAndUpdate(documentId, { content });
    });
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
};
