
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <MapPin size={20} className="text-barcelona-blue" />
            <span className="font-bold text-barcelona-dark">ParkBCN</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:space-x-6 text-sm text-gray-600">
            <Link to="/about" className="mb-2 md:mb-0 hover:text-barcelona-blue">About</Link>
            <Link to="/privacy" className="mb-2 md:mb-0 hover:text-barcelona-blue">Privacy Policy</Link>
            <Link to="/terms" className="mb-2 md:mb-0 hover:text-barcelona-blue">Terms of Service</Link>
            <Link to="/contact" className="hover:text-barcelona-blue">Contact</Link>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a href="mailto:info@parkbcn.com" className="text-gray-600 hover:text-barcelona-blue">
              <Mail size={20} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-barcelona-blue">
              <Github size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ParkBCN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
