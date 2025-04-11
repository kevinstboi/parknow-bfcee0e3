
import React from 'react';
import { Layout } from '@/components/Layout';
import { PointsCard } from '@/components/PointsCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

// Mock data for points and activities
const mockPointsData = {
  totalPoints: 75,
  level: "Bronce",
  nextLevelPoints: 100,
  recentActivities: [
    {
      id: 1,
      type: "Plaza Libre Reportada",
      points: 5,
      date: "Hoy, 14:32",
      location: "Carrer de Mallorca, 401"
    },
    {
      id: 2,
      type: "Plaza Libre Reportada",
      points: 5,
      date: "Ayer, 19:15",
      location: "Passeig de Gràcia, 92"
    },
    {
      id: 3,
      type: "Cuenta Creada",
      points: 10,
      date: "10 Abr, 2025"
    },
    {
      id: 4,
      type: "Plaza Libre Reportada",
      points: 5,
      date: "8 Abr, 2025",
      location: "Avinguda Diagonal, 211"
    }
  ]
};

const PointsPage = () => {
  return (
    <Layout>
      <div className="container px-4 mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Mis Puntos y Actividad</h1>
          <Link to="/report">
            <Button className="bg-barcelona-orange hover:bg-barcelona-orange/90 text-white">
              <Plus size={18} className="mr-2" />
              Reportar Plaza
            </Button>
          </Link>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <PointsCard 
            totalPoints={mockPointsData.totalPoints}
            level={mockPointsData.level}
            nextLevelPoints={mockPointsData.nextLevelPoints}
            recentActivities={mockPointsData.recentActivities}
          />
          
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Sistema de Puntos</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-barcelona-blue/10 p-2 rounded-full mr-3">
                  <Plus size={16} className="text-barcelona-blue" />
                </div>
                <div>
                  <p className="font-medium">Reportar una Plaza Libre</p>
                  <p className="text-gray-600 text-sm">Gana 5 puntos cada vez que reportes una plaza de aparcamiento disponible</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-barcelona-blue/10 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-barcelona-blue w-4 h-4">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Crear una Cuenta</p>
                  <p className="text-gray-600 text-sm">Obtén 10 puntos cuando te registres</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-barcelona-blue/10 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-barcelona-blue w-4 h-4">
                    <path d="M12 13V5M13 20h6M5 20h5" />
                    <path d="M18 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <circle cx="9" cy="16" r="3" />
                    <path d="M8 16h2" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">Invitar a un Amigo</p>
                  <p className="text-gray-600 text-sm">Obtén 15 puntos por cada amigo que se una usando tu código de referencia</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-100 pt-4">
              <h4 className="font-medium mb-3">Niveles</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Bronce</span>
                  <span className="text-sm text-gray-500">0-99 puntos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Plata</span>
                  <span className="text-sm text-gray-500">100-249 puntos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Oro</span>
                  <span className="text-sm text-gray-500">250-499 puntos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Platino</span>
                  <span className="text-sm text-gray-500">500+ puntos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PointsPage;
