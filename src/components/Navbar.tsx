
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/components/ui/toast';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Mock authentication for now
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <MapPin size={24} className="text-barcelona-blue" />
            <span className="font-bold text-lg text-barcelona-dark">ParkBCN</span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-barcelona-blue font-medium">Home</Link>
              <Link to="/map" className="text-gray-600 hover:text-barcelona-blue font-medium">Find Spots</Link>
              <Link to="/report" className="text-gray-600 hover:text-barcelona-blue font-medium">Report Spot</Link>
              <Link to="/points" className="text-gray-600 hover:text-barcelona-blue font-medium">My Points</Link>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center space-x-2 text-barcelona-blue">
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  <Button 
                    variant="ghost"
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="outline" className="rounded-full">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-barcelona-blue rounded-full text-white hover:bg-barcelona-blue/90">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-barcelona-blue"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobile && isOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-barcelona-blue font-medium py-2" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/map" className="text-gray-600 hover:text-barcelona-blue font-medium py-2" onClick={() => setIsOpen(false)}>Find Spots</Link>
              <Link to="/report" className="text-gray-600 hover:text-barcelona-blue font-medium py-2" onClick={() => setIsOpen(false)}>Report Spot</Link>
              <Link to="/points" className="text-gray-600 hover:text-barcelona-blue font-medium py-2" onClick={() => setIsOpen(false)}>My Points</Link>
              
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="text-barcelona-blue flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                    <User size={20} />
                    <span>Profile</span>
                  </Link>
                  <button 
                    className="text-red-500 flex items-center space-x-2 py-2"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full">Login</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-barcelona-blue rounded-full text-white hover:bg-barcelona-blue/90">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
