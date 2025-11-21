import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/documents');
        setDocuments(res.data);
      } catch (err) {
        console.error('Error fetching documents', err);
      }
    };
    fetchDocuments();
  }, []);

  const createDocument = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/documents', { title: 'Untitled Document' });
      navigate(`/documents/${res.data._id}`);
    } catch (err) {
      console.error('Error creating document', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Collaborative Editor</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Documents</h2>
            <button
              onClick={createDocument}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              New Document
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <Link
                key={doc._id}
                to={`/documents/${doc._id}`}
                className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50"
              >
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{doc.title}</h5>
                <p className="font-normal text-gray-700">
                  Last modified: {new Date(doc.lastModified).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
