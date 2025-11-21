import React, { useState, useEffect, useRef } from 'react';
import TextEditor from '../components/TextEditor';
import AIAssistant from '../components/AIAssistant';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Editor = () => {
  const { id: documentId } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Untitled Document');
  const quillRef = useRef();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/documents/${documentId}`);
        setTitle(res.data.title);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDocument();
  }, [documentId]);

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
  };

  const saveTitle = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/documents/${documentId}`, { title });
    } catch (err) {
      console.error(err);
    }
  };

  const insertText = (text) => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      if (range) {
        editor.insertText(range.index, text);
      } else {
        editor.insertText(editor.getLength(), text);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14">
            <div className="flex items-center">
              <Link to="/" className="text-indigo-600 font-bold hover:text-indigo-800">
                &larr; Dashboard
              </Link>
              <input 
                type="text" 
                value={title} 
                onChange={handleTitleChange}
                onBlur={saveTitle}
                className="ml-4 text-gray-700 font-medium border-b border-transparent hover:border-gray-300 focus:border-indigo-500 focus:outline-none px-2 py-1"
              />
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex flex-grow overflow-hidden">
        <div className="flex-grow">
          <TextEditor setContent={setContent} ref={quillRef} />
        </div>
        <AIAssistant content={content} onInsert={insertText} />
      </div>
    </div>
  );
};

export default Editor;
