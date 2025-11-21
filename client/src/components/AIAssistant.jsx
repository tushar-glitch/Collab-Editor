import React, { useState } from 'react';
import axios from 'axios';

const AIAssistant = ({ content, onInsert }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [activeTab, setActiveTab] = useState('grammar');

  const handleAIRequest = async (endpoint) => {
    setLoading(true);
    setResult('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/${endpoint}`, { text: content });
      setResult(res.data.suggestion || res.data.summary || res.data.completion || res.data.enhancedText);
    } catch (err) {
      console.error(err);
      setResult('Error processing AI request');
    }
    setLoading(false);
  };

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 flex flex-col h-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">AI Assistant</h3>
      
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setActiveTab('grammar')}
          className={`px-3 py-1 text-sm rounded-md ${activeTab === 'grammar' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Grammar
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-3 py-1 text-sm rounded-md ${activeTab === 'summary' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Summary
        </button>
        <button
          onClick={() => setActiveTab('complete')}
          className={`px-3 py-1 text-sm rounded-md ${activeTab === 'complete' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          Complete
        </button>
      </div>

      <div className="flex-grow overflow-y-auto mb-4">
        {loading ? (
          <div className="text-center text-gray-500">Thinking...</div>
        ) : (
          <div className="flex flex-col space-y-2">
            <div className="p-3 bg-white rounded-md border border-gray-200 text-sm whitespace-pre-wrap">
              {result || 'Select text or type content to get AI assistance.'}
            </div>
            {result && (
              <button
                onClick={() => onInsert(result)}
                className="self-end px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
              >
                Insert to Editor
              </button>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        {activeTab === 'grammar' && (
          <button
            onClick={() => handleAIRequest('grammar-check')}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            Check Grammar
          </button>
        )}
        {activeTab === 'summary' && (
          <button
            onClick={() => handleAIRequest('summarize')}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            Summarize Document
          </button>
        )}
        {activeTab === 'complete' && (
          <button
            onClick={() => handleAIRequest('complete')}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            Auto-Complete Text
          </button>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
