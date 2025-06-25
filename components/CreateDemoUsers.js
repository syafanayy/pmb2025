// components/CreateDemoUsers.js - Component untuk membuat demo users
"use client";
import { useState } from 'react';
import { createDemoUsers } from '@/lib/auth';

export default function CreateDemoUsers() {
  const [isCreating, setIsCreating] = useState(false);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleCreateDemoUsers = async () => {
    setIsCreating(true);
    setResults([]);
    setShowResults(false);

    try {
      console.log('🚀 Starting demo users creation...');
      const creationResults = await createDemoUsers();
      setResults(creationResults);
      setShowResults(true);
      console.log('✅ Demo users creation completed:', creationResults);
    } catch (error) {
      console.error('❌ Error creating demo users:', error);
      setResults([{
        username: 'error',
        status: 'failed',
        success: false,
        error: error.message
      }]);
      setShowResults(true);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-yellow-500/20 border border-yellow-500/50 p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-yellow-300">🧪 Setup Demo Users</h3>
          <p className="text-xs text-yellow-200 mt-1">
            Klik tombol di bawah untuk membuat akun demo jika belum ada
          </p>
        </div>
        <button
          onClick={handleCreateDemoUsers}
          disabled={isCreating}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Membuat...
            </div>
          ) : (
            'Buat Demo Users'
          )}
        </button>
      </div>

      {showResults && results.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-semibold text-yellow-300 text-sm">Hasil:</h4>
          {results.map((result, index) => (
            <div 
              key={index}
              className={`p-2 rounded text-xs ${
                result.success 
                  ? 'bg-green-500/20 text-green-300' 
                  : 'bg-red-500/20 text-red-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">@{result.username}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  result.status === 'created' ? 'bg-green-600' :
                  result.status === 'exists' ? 'bg-blue-600' :
                  'bg-red-600'
                }`}>
                  {result.status === 'created' ? '✅ Dibuat' :
                   result.status === 'exists' ? '✅ Sudah Ada' :
                   '❌ Gagal'}
                </span>
              </div>
              {result.error && (
                <div className="text-xs text-red-400 mt-1">
                  Error: {result.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}