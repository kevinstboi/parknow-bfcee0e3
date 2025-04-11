import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, User, LogOut } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const {
    toast
  } = useToast();

  // Mock authentication for now
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Sesión cerrada correctamente",
      description: "Has cerrado sesión en tu cuenta."
    });
  };
  return <nav className="bg-barcelona-blue text-white shadow-md sticky top-0 z-30">
      <div className="px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <MapPin size={24} className="text-white" />
            <span className="font-bold text-lg text-white">ParkNow</span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white hover:text-opacity-80 font-medium">Inicio</Link>
              <Link to="/map" className="text-white hover:text-opacity-80 font-medium">Buscar Plazas</Link>
              <Link to="/report" className="text-white hover:text-opacity-80 font-medium">Reportar Plaza</Link>
              <Link to="/points" className="text-white hover:text-opacity-80 font-medium">Mis Puntos</Link>
              
              {isLoggedIn ? <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center space-x-2 text-white">
                    <User size={20} />
                    <span>Perfil</span>
                  </Link>
                  <Button variant="ghost" className="flex items-center space-x-2 text-white hover:text-red-300" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                  </Button>
                </div> : <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="outline" className="rounded-full border-white hover:bg-white text-slate-600">Iniciar Sesión</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-barcelona-orange rounded-full text-white hover:bg-barcelona-orange/90">Registrarse</Button>
                  </Link>
                </div>}
            </div>}
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-barcelona-orange">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobile && isOpen && <div className="md:hidden pt-4 pb-2 animate-fade-in bg-barcelona-blue">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-white hover:text-barcelona-orange font-medium py-2" onClick={() => setIsOpen(false)}>Inicio</Link>
              <Link to="/map" className="text-white hover:text-barcelona-orange font-medium py-2" onClick={() => setIsOpen(false)}>Buscar Plazas</Link>
              <Link to="/report" className="text-white hover:text-barcelona-orange font-medium py-2" onClick={() => setIsOpen(false)}>Reportar Plaza</Link>
              <Link to="/points" className="text-white hover:text-barcelona-orange font-medium py-2" onClick={() => setIsOpen(false)}>Mis Puntos</Link>
              
              {isLoggedIn ? <>
                  <Link to="/profile" className="text-white flex items-center space-x-2 py-2" onClick={() => setIsOpen(false)}>
                    <User size={20} />
                    <span>Perfil</span>
                  </Link>
                  <button className="text-red-300 flex items-center space-x-2 py-2" onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}>
                    <LogOut size={20} />
                    <span>Cerrar Sesión</span>
                  </button>
                </> : <div className="flex flex-col space-y-2 pt-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full border-white text-white hover:bg-white hover:text-barcelona-blue">Iniciar Sesión</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-barcelona-orange rounded-full text-white hover:bg-barcelona-orange/90">Registrarse</Button>
                  </Link>
                </div>}
            </div>
          </div>}
      </div>
    </nav>;
};