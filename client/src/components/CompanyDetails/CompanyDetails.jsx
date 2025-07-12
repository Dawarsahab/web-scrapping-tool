import React from 'react';
import { FaGlobe, FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const CompanyDetails = ({ company }) => {
  if (!company || company.status === 'error') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Details</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
            <p className="text-gray-600">{company.description || 'No description available'}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">About Us</h3>
            <p className="text-gray-600">{company.aboutContent || 'No about content available'}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaGlobe className="text-gray-500 mr-2" />
                <a 
                  href={company.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {company.website}
                </a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-gray-500 mr-2" />
                <span>{company.email || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-gray-500 mr-2" />
                <span>{company.phone || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {company.techStack && company.techStack.map((tech, index) => (
                <span 
                  key={index} 
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
              {(!company.techStack || company.techStack.length === 0) && (
                <span className="text-gray-500">No technologies detected</span>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Social Profiles</h3>
            <div className="flex space-x-4">
              {company.socialProfiles?.linkedin && (
                <a href={company.socialProfiles.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-blue-700 text-2xl hover:opacity-80" />
                </a>
              )}
              {company.socialProfiles?.twitter && (
                <a href={company.socialProfiles.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-blue-400 text-2xl hover:opacity-80" />
                </a>
              )}
              {company.socialProfiles?.facebook && (
                <a href={company.socialProfiles.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-blue-600 text-2xl hover:opacity-80" />
                </a>
              )}
              {company.socialProfiles?.instagram && (
                <a href={company.socialProfiles.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-pink-600 text-2xl hover:opacity-80" />
                </a>
              )}
              {!company.socialProfiles?.linkedin && 
               !company.socialProfiles?.twitter && 
               !company.socialProfiles?.facebook && 
               !company.socialProfiles?.instagram && (
                <span className="text-gray-500">No social profiles found</span>
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Projects & Portfolio</h3>
            <div className="space-y-4">
              {company.projects && company.projects.length > 0 ? (
                company.projects.slice(0, 3).map((project, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-800">{project.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No projects detected</p>
              )}
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;