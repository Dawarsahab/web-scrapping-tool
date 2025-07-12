import React, { useState } from 'react';
import { FaSearch, FaSpinner } from 'react-icons/fa';

const SearchForm = ({ onSubmit, loading }) => {
  const [urls, setUrls] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!urls.trim()) {
      setError('Please enter at least one URL');
      return;
    }
    
    const urlList = urls.split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);
    
    onSubmit({ urls: urlList });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company URLs (one per line)
        </label>
        <textarea
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          rows={5}
          placeholder="https://example.com&#10;https://another-example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter URLs of company websites to scrape
        </p>
      </div>
      
      {error && (
        <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {loading ? (
          <>
            <FaSpinner className="animate-spin mr-2" />
            Scraping...
          </>
        ) : (
          <>
            <FaSearch className="mr-2" />
            Start Scraping
          </>
        )}
      </button>
    </form>
  );
};

export default SearchForm;