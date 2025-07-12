import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const ErrorAlert = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <FaExclamationTriangle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;