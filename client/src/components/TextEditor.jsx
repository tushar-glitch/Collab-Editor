import React, { useEffect, useRef, useState, forwardRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import QuillCursors from 'quill-cursors';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

const SAVE_INTERVAL_MS = 2000;

Quill.register('modules/cursors', QuillCursors);

const TextEditor = forwardRef(({ setContent }, ref) => {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  // Connect to Socket.io
  useEffect(() => {
    const s = io(import.meta.env.VITE_API_URL);
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  // Join document room and load content
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.emit('get-document', documentId);

    socket.once('load-document', document => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit('join-document', documentId);
  }, [socket, quill, documentId]);

  // Send changes
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
      setContent(quill.getText()); // Update parent state for AI
    };

    const cursorHandler = (range, oldRange, source) => {
        if (source !== 'user') return;
        socket.emit('cursor-move', range);
    };

    quill.on('text-change', handler);
    quill.on('selection-change', cursorHandler);

    return () => {
      quill.off('text-change', handler);
      quill.off('selection-change', cursorHandler);
    };
  }, [socket, quill, setContent]);

  // Receive changes and cursors
  useEffect(() => {
    if (socket == null || quill == null) return;

    const handler = (delta) => {
      quill.updateContents(delta);
    };

    const cursorHandler = ({ range, id, name }) => {
        const cursors = quill.getModule('cursors');
        cursors.createCursor(id, name, 'blue');
        cursors.moveCursor(id, range);
    }

    socket.on('receive-changes', handler);
    socket.on('receive-cursor-move', cursorHandler);

    return () => {
      socket.off('receive-changes', handler);
      socket.off('receive-cursor-move', cursorHandler);
    };
  }, [socket, quill]);

  // Auto-save
  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  return (
    <div className="bg-white h-screen flex flex-col">
      <ReactQuill 
        theme="snow" 
        ref={(el) => {
            if(el) {
                setQuill(el.getEditor());
                if (typeof ref === 'function') {
                    ref(el);
                } else if (ref) {
                    ref.current = el;
                }
            }
        }}
        className="flex-grow"
        modules={{
            cursors: true,
            toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block']
            ]
        }}
      />
    </div>
  );
});

export default TextEditor;
