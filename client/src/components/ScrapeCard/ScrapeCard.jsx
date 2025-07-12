import React from 'react';
import { FaExternalLinkAlt, FaEnvelope, FaPhone, FaExclamationTriangle } from 'react-icons/fa';

const ScrapeCard = ({ company }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-4 border ${
      company.status === 'error' ? 'border-red-300' : 'border-gray-200'
    }`}>
      <div className="flex justify-between items-start">
        <div className="overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
            {company.name || company.website || 'Unknown Company'}
          </h3>
          
          <div className="flex items-center mb-2">
            <FaExternalLinkAlt className="text-gray-500 mr-2 flex-shrink-0" />
            <a 
              href={company.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm truncate max-w-xs"
            >
              {company.website}
            </a>
          </div>
        </div>
        
        {company.status === 'success' ? (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 whitespace-nowrap">
            Success
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 flex items-center">
            <FaExclamationTriangle className="mr-1" />
            Error
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <div className="flex items-center">
          <FaEnvelope className="text-gray-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700 text-sm truncate">
            {company.email || 'N/A'}
          </span>
        </div>
        
        <div className="flex items-center">
          <FaPhone className="text-gray-500 mr-2 flex-shrink-0" />
          <span className="text-gray-700 text-sm truncate">
            {company.phone || 'N/A'}
          </span>
        </div>
      </div>
      {result.searchPosition && (
  <div className="mt-3">
    <div className="text-xs font-semibold text-gray-500">Search Result</div>
    <div className="text-sm">
      <span className="font-medium">Position:</span> {result.searchPosition}
    </div>
    <div className="text-sm truncate" title={result.searchTitle}>
      {result.searchTitle}
    </div>
  </div>
)}
      {company.error && (
        <div className="mt-3 p-2 bg-red-50 rounded text-red-700 text-xs">
          <span className="font-medium">Error:</span> {company.error}
        </div>
      )}
    </div>
  );
};

export default ScrapeCard;