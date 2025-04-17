
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { MapComponent } from '@/components/MapComponent';
import { ParkingSpotDialog } from '@/components/ParkingSpotDialog';
import { useToast } from '@/hooks/use-toast';

// Defining a type for parking spots
export interface ParkingSpot {
  id: number;
  lat: number;
  lng: number;
  location: string;
  available: boolean;
  updatedAt: string;
}

// Mock data for parking spots with coordinates
const initialParkingSpots: ParkingSpot[] = [
  { id: 1, lat: 41.3851, lng: 2.1734, location: "Carrer de Mallorca, 401", available: true, updatedAt: 'hace 10 mins' },
  { id: 2, lat: 41.3870, lng: 2.1698, location: "Plaça de Catalunya", available: true, updatedAt: 'hace 15 mins' },
  { id: 3, lat: 41.3917, lng: 2.1649, location: "Passeig de Gràcia", available: true, updatedAt: 'hace 30 mins' },
  { id: 4, lat: 41.3948, lng: 2.1545, location: "Avinguda Diagonal", available: true, updatedAt: 'hace 1 hora' },
  { id: 5, lat: 41.4012, lng: 2.1741, location: "Sagrada Família", available: true, updatedAt: 'hace 2 horas' },
];

const MapPage = () => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>(initialParkingSpots);
  const [nearbySpot, setNearbySpot] = useState<ParkingSpot | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  // Simular la detección de cercanía a una plaza
  useEffect(() => {
    // En una aplicación real, esto se haría con geolocalización en tiempo real
    // y comparando la distancia con las plazas reportadas
    const timer = setTimeout(() => {
      // Simulamos que se ha detectado una plaza cercana
      const availableSpots = parkingSpots.filter(spot => spot.available);
      
      if (availableSpots.length > 0) {
        // Seleccionamos una plaza aleatoria de las disponibles
        const randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
        setNearbySpot(randomSpot);
        setShowDialog(true);
        
        toast({
          title: "Plaza cercana detectada",
          description: `Has llegado a ${randomSpot.location} donde se reportó una plaza libre.`
        });
      }
    }, 10000); // Mostramos el diálogo después de 10 segundos para simular

    return () => clearTimeout(timer);
  }, [parkingSpots]);

  const handleParked = (spotId: number) => {
    // Marcar la plaza como ocupada
    setParkingSpots(prev => 
      prev.map(spot => 
        spot.id === spotId 
          ? { ...spot, available: false } 
          : spot
      )
    );
    
    toast({
      title: "¡Genial!",
      description: "Nos alegra que hayas encontrado aparcamiento."
    });
    setShowDialog(false);
  };

  const handleContinueSearching = (spotId: number) => {
    // Marcar la plaza como ocupada porque ya no está disponible
    setParkingSpots(prev => 
      prev.map(spot => 
        spot.id === spotId 
          ? { ...spot, available: false } 
          : spot
      )
    );
    
    toast({
      title: "Seguimos buscando",
      description: "Hemos marcado esta plaza como ocupada para otros usuarios."
    });
    setShowDialog(false);
  };

  return (
    <Layout>
      <div className="px-4 py-4">
        <h1 className="text-xl font-bold mb-3">Buscar Plazas de Aparcamiento</h1>
        <div className="mb-8">
          <MapComponent 
            parkingSpots={parkingSpots}
          />
        </div>
      </div>

      {nearbySpot && (
        <ParkingSpotDialog
          spot={nearbySpot}
          open={showDialog}
          onOpenChange={setShowDialog}
          onParked={handleParked}
          onContinueSearching={handleContinueSearching}
        />
      )}
    </Layout>
  );
};

export default MapPage;
