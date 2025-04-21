
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { MapComponent } from '@/components/MapComponent';
import { ParkingSpotDialog } from '@/components/ParkingSpotDialog';
import { useToast } from '@/hooks/use-toast';
import { LeavingSoonDialog } from '@/components/LeavingSoonDialog';
import { Bell } from 'lucide-react';

// Defining a type for parking spots
export interface ParkingSpot {
  id: number;
  lat: number;
  lng: number;
  location: string;
  available: boolean;
  updatedAt: string;
  reliability?: number; // Nueva propiedad para la confiabilidad basada en votos
  isLeavingSoon?: boolean; // Nueva propiedad para marcar plazas que se liberarán pronto
  leavingTime?: number; // Tiempo en minutos hasta que se libere
}

// Mock data for parking spots with coordinates
const initialParkingSpots: ParkingSpot[] = [
  { id: 1, lat: 41.3851, lng: 2.1734, location: "Carrer de Mallorca, 401", available: true, updatedAt: 'hace 10 mins', reliability: 0.85 },
  { id: 2, lat: 41.3870, lng: 2.1698, location: "Plaça de Catalunya", available: true, updatedAt: 'hace 15 mins', reliability: 0.92 },
  { id: 3, lat: 41.3917, lng: 2.1649, location: "Passeig de Gràcia", available: true, updatedAt: 'hace 30 mins', reliability: 0.78 },
  { id: 4, lat: 41.3948, lng: 2.1545, location: "Avinguda Diagonal", available: true, updatedAt: 'hace 1 hora', reliability: 0.65 },
  { id: 5, lat: 41.4012, lng: 2.1741, location: "Sagrada Família", available: true, updatedAt: 'hace 2 horas', reliability: 0.89 },
  { id: 6, lat: 41.3925, lng: 2.1650, location: "Carrer de València", available: false, updatedAt: 'hace 10 mins', isLeavingSoon: true, leavingTime: 5 },
];

// Mock data for favorite areas
const favoriteAreas = [
  { id: 1, name: "Cerca de casa", lat: 41.3917, lng: 2.1649, radius: 500 }, // 500m radius
  { id: 2, name: "Trabajo", lat: 41.3948, lng: 2.1545, radius: 300 }, // 300m radius
];

const MapPage = () => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>(initialParkingSpots);
  const [nearbySpot, setNearbySpot] = useState<ParkingSpot | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showLeavingSoonDialog, setShowLeavingSoonDialog] = useState(false);
  const [leavingSoonSpot, setLeavingSoonSpot] = useState<ParkingSpot | null>(null);
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

  // Simular notificaciones para plazas en zonas favoritas
  useEffect(() => {
    // Simulamos un reporte de una nueva plaza después de un tiempo
    const notificationTimer = setTimeout(() => {
      // Simulamos un nuevo reporte en una zona favorita
      const newSpot: ParkingSpot = {
        id: Date.now(),
        lat: favoriteAreas[0].lat + (Math.random() * 0.002 - 0.001), // pequeña variación aleatoria
        lng: favoriteAreas[0].lng + (Math.random() * 0.002 - 0.001),
        location: "Carrer d'Aragó, 234",
        available: true,
        updatedAt: 'ahora mismo',
        reliability: 0.9
      };
      
      // Añadir la nueva plaza y mostrar notificación
      setParkingSpots(prev => [...prev, newSpot]);
      
      toast({
        title: "¡Nueva plaza disponible!",
        description: `Se ha reportado una plaza libre cerca de tu zona favorita "${favoriteAreas[0].name}"`,
      });
    }, 15000); // 15 segundos después del cargado inicial
    
    // Simulamos una notificación de "Voy a salir"
    const leavingSoonTimer = setTimeout(() => {
      const leavingSpot: ParkingSpot = {
        id: Date.now() + 1,
        lat: favoriteAreas[1].lat + (Math.random() * 0.002 - 0.001),
        lng: favoriteAreas[1].lng + (Math.random() * 0.002 - 0.001),
        location: "Carrer de Rosselló, 326",
        available: false,
        updatedAt: 'ahora mismo',
        isLeavingSoon: true,
        leavingTime: 3 // 3 minutos
      };
      
      setParkingSpots(prev => [...prev, leavingSpot]);
      setLeavingSoonSpot(leavingSpot);
      setShowLeavingSoonDialog(true);
      
      toast({
        title: "¡Alguien va a salir pronto!",
        description: `Un usuario saldrá en 3 minutos cerca de tu zona favorita "${favoriteAreas[1].name}"`,
      });
    }, 20000); // 20 segundos después del cargado inicial

    return () => {
      clearTimeout(notificationTimer);
      clearTimeout(leavingSoonTimer);
    };
  }, []);

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

  const handleLeavingSoonNotification = () => {
    if (leavingSoonSpot) {
      toast({
        title: "Recordatorio configurado",
        description: `Te notificaremos cuando la plaza en ${leavingSoonSpot.location} esté disponible.`
      });
    }
    setShowLeavingSoonDialog(false);
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
        
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start">
          <Bell className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Notificaciones Activadas</h3>
            <p className="text-sm text-blue-700">
              Recibirás alertas cuando se liberen plazas en tus zonas favoritas. 
              También cuando alguien indique que va a salir en breve.
            </p>
          </div>
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
      
      {leavingSoonSpot && (
        <LeavingSoonDialog
          spot={leavingSoonSpot}
          open={showLeavingSoonDialog}
          onOpenChange={setShowLeavingSoonDialog}
          onNotify={handleLeavingSoonNotification}
        />
      )}
    </Layout>
  );
};

export default MapPage;
