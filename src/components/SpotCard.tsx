
import React from 'react';
import { Clock, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SpotCardProps {
  id: number;
  location: string;
  distance: string;
  availableSince: string;
  reportedBy: string;
}

export const SpotCard = ({ id, location, distance, availableSince, reportedBy }: SpotCardProps) => {
  const { toast } = useToast();
  
  const handleGetDirections = () => {
    toast({
      title: "Obteniendo direcciones",
      description: `Cargando direcciones a ${location}...`,
    });
  };
  
  return (
    <div className="card-spot">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center text-barcelona-blue">
          <MapPin size={16} className="mr-1" />
          <span className="font-medium">{location}</span>
        </div>
        <span className="text-sm text-gray-500">{distance}</span>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-3">
        <Clock size={14} className="mr-1" />
        <span>Disponible desde {availableSince}</span>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">Reportado por {reportedBy}</span>
        <Button 
          size="sm" 
          className="flex items-center bg-barcelona-blue hover:bg-barcelona-blue/90"
          onClick={handleGetDirections}
        >
          <Navigation size={14} className="mr-1" />
          <span>Ir</span>
        </Button>
      </div>
    </div>
  );
};
