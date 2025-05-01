
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MapPin, User, LogOut, Home, Map } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleLogout = async () => {
    await signOut();
  };
  
  const isActive = (path: string) => {
    return location.pathname === path ? "bg-barcelona-blue/20" : "";
  };
  
  return <nav className="bg-barcelona-blue text-white shadow-md sticky top-0 z-30">
      <div className="px-4 py-3 container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <MapPin size={24} className="text-white" />
            <span className="font-bold text-lg text-white">ParkNow</span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:bg-barcelona-blue/20 ${isActive("/")}`}>
                <Home size={20} />
                <span>Inicio</span>
              </Link>
              <Link to="/map" className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:bg-barcelona-blue/20 ${isActive("/map")}`}>
                <Map size={20} />
                <span>Buscar Plazas</span>
              </Link>
              <Link to="/report" className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:bg-barcelona-blue/20 ${isActive("/report")}`}>
                <MapPin size={20} />
                <span>Reportar Plaza</span>
              </Link>
              <Link to="/points" className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:bg-barcelona-blue/20 ${isActive("/points")}`}>
                <User size={20} />
                <span>Mis Puntos</span>
              </Link>
              
              {user ? <div className="flex items-center space-x-4 border-l pl-4 ml-2">
                  <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-red-300" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                  </Button>
                </div> : <div className="flex items-center space-x-4 border-l pl-4 ml-2">
                  <Link to="/login">
                    <Button variant="outline" className="rounded-full border-white hover:bg-white text-slate-950">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-barcelona-orange rounded-full text-white hover:bg-barcelona-orange/90">
                      Registrarse
                    </Button>
                  </Link>
                </div>}
            </div>}
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-white hover:bg-barcelona-blue/20">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobile && isOpen && <div className="md:hidden pt-4 pb-2 animate-in fade-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-2">
              <Link to="/" className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors hover:bg-barcelona-blue/20 ${isActive("/")}`} onClick={() => setIsOpen(false)}>
                <Home size={20} />
                <span>Inicio</span>
              </Link>
              <Link to="/map" className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors hover:bg-barcelona-blue/20 ${isActive("/map")}`} onClick={() => setIsOpen(false)}>
                <Map size={20} />
                <span>Buscar Plazas</span>
              </Link>
              <Link to="/report" className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors hover:bg-barcelona-blue/20 ${isActive("/report")}`} onClick={() => setIsOpen(false)}>
                <MapPin size={20} />
                <span>Reportar Plaza</span>
              </Link>
              <Link to="/points" className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors hover:bg-barcelona-blue/20 ${isActive("/points")}`} onClick={() => setIsOpen(false)}>
                <User size={20} />
                <span>Mis Puntos</span>
              </Link>
              
              {user ? <button className="flex items-center space-x-2 px-4 py-3 rounded-lg text-red-300 hover:bg-barcelona-blue/20" onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}>
                  <LogOut size={20} />
                  <span>Cerrar Sesión</span>
                </button> : <div className="flex flex-col space-y-2 pt-2 px-4">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full border-white text-white hover:bg-white hover:text-barcelona-blue">
                      Iniciar Sesión
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-barcelona-orange rounded-full text-white hover:bg-barcelona-orange/90">
                      Registrarse
                    </Button>
                  </Link>
                </div>}
            </div>
          </div>}
      </div>
    </nav>;
};
