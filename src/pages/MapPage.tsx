
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { MapComponent } from '@/components/MapComponent';
import { ParkingSpotDialog } from '@/components/ParkingSpotDialog';
import { useToast } from '@/hooks/use-toast';

const MapPage = () => {
  const [nearbySpot, setNearbySpot] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const { toast } = useToast();

  // Simular la detección de cercanía a una plaza
  useEffect(() => {
    // En una aplicación real, esto se haría con geolocalización en tiempo real
    // y comparando la distancia con las plazas reportadas
    const timer = setTimeout(() => {
      // Simulamos que se ha detectado una plaza cercana
      const mockSpot = {
        id: 123,
        location: "Carrer de Mallorca, 401",
        updatedAt: "hace 5 minutos"
      };
      
      setNearbySpot(mockSpot);
      setShowDialog(true);
      
      toast({
        title: "Plaza cercana detectada",
        description: "Has llegado a una zona con una plaza libre reportada."
      });
    }, 10000); // Mostramos el diálogo después de 10 segundos para simular

    return () => clearTimeout(timer);
  }, []);

  const handleParked = () => {
    toast({
      title: "¡Genial!",
      description: "Nos alegra que hayas encontrado aparcamiento."
    });
    setShowDialog(false);
  };

  const handleContinueSearching = () => {
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
          <MapComponent />
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
