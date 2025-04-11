
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-barcelona-blue text-white py-4 fixed bottom-0 w-full z-10">
      <div className="px-4">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex items-center space-x-2 mb-2 md:mb-0">
            <MapPin size={18} className="text-white" />
            <span className="font-bold text-white">ParkBCN</span>
          </div>
          
          <div className="text-xs text-center text-white/80">
            <p>© {new Date().getFullYear()} ParkBCN</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
