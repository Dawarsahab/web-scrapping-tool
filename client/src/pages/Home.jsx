import React, { useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import ResultsTable from '../components/ResultsTable/ResultsTable';
import ErrorAlert from '../components/ErrorAlert/ErrorAlert';

const Home = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScrape = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:4000/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Scraping failed');
      
      setResults(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Company Scraper Tool
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Extract company information from websites by entering URLs
        </p>
      </header>

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <SearchForm onSubmit={handleScrape} loading={loading} />
      </div>

      {error && <ErrorAlert message={error} />}

      <ResultsTable results={results} loading={loading} />
    </div>
  );
};

export default Home;