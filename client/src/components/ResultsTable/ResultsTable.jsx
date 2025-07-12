import React, { useState } from 'react';
import { FaExternalLinkAlt, FaExclamationTriangle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import CompanyDetails from '../CompanyDetails/CompanyDetails';

const ResultsTable = ({ results, loading }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  
  
  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center my-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <h3 className="text-lg font-medium text-gray-700 mb-2">
          No results yet
        </h3>
        <p className="text-gray-500">
          Enter URLs to start scraping company information
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Scraping Results ({results.length})
        </h2>
        
        <button
          onClick={() => {
            const dataStr = JSON.stringify(results, null, 2);
            const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', `company-data-${new Date().toISOString()}.json`);
            linkElement.click();
          }}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Export as JSON
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Technologies
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result, index) => (
              <React.Fragment key={index}>
                <tr className={result.status === 'error' ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {result.name || 'N/A'}
                    </div>
                    {result.description && (
                      <div className="text-sm text-gray-500 mt-1 truncate max-w-xs">
                        {result.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a 
                      href={result.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:text-blue-900"
                    >
                      {result.website}
                      <FaExternalLinkAlt className="ml-1 text-xs" />
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {result.techStack && result.techStack.length > 0 ? (
                        <>
                          {result.techStack.slice(0, 3).map((tech, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                          {result.techStack.length > 3 && (
                            <span className="text-gray-500 text-xs">
                              +{result.techStack.length - 3} more
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-gray-400 text-xs">None detected</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {result.status === 'success' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Success
                      </span>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <FaExclamationTriangle className="mr-1" />
                        <span>Error</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => toggleRow(index)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      {expandedRow === index ? (
                        <>
                          <FaChevronUp className="mr-1" /> Hide
                        </>
                      ) : (
                        <>
                          <FaChevronDown className="mr-1" /> Show
                        </>
                      )}
                    </button>
                  </td>
                </tr>
                
                {expandedRow === index && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 bg-gray-50">
                      <div className="mt-4">
                        <CompanyDetails company={result} />
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;