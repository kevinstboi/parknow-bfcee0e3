
import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Navigation, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Mock data for parking spots
const mockParkingSpots = [
  { id: 1, lat: 41.3851, lng: 2.1734, available: true, updatedAt: 'hace 10 mins' },
  { id: 2, lat: 41.3870, lng: 2.1698, available: true, updatedAt: 'hace 15 mins' },
  { id: 3, lat: 41.3917, lng: 2.1649, available: true, updatedAt: 'hace 30 mins' },
  { id: 4, lat: 41.3948, lng: 2.1545, available: true, updatedAt: 'hace 1 hora' },
  { id: 5, lat: 41.4012, lng: 2.1741, available: true, updatedAt: 'hace 2 horas' },
];

export const MapComponent = () => {
  const mapRef = useRef(null);
  const { toast } = useToast();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [openSpotInfoId, setOpenSpotInfoId] = useState<number | null>(null);
  const [mapApiKey, setMapApiKey] = useState<string>('');
  const [mapApiKeyEntered, setMapApiKeyEntered] = useState(false);

  // Function to initialize map (mock for now)
  useEffect(() => {
    if (mapApiKeyEntered && mapRef.current) {
      // Mock map loading
      const timer = setTimeout(() => {
        setMapLoaded(true);
        toast({
          title: "Mapa cargado correctamente",
          description: "Mostrando plazas de aparcamiento disponibles en Barcelona.",
        });
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [mapApiKeyEntered, toast]);

  const handleUseCurrentLocation = () => {
    toast({
      title: "Usando ubicación actual",
      description: "Buscando plazas de aparcamiento cerca de ti...",
    });
  };

  const toggleSpotInfo = (spotId: number) => {
    setOpenSpotInfoId(openSpotInfoId === spotId ? null : spotId);
  };

  const handleSubmitApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapApiKey.trim()) {
      setMapApiKeyEntered(true);
      toast({
        title: "Clave API del mapa configurada",
        description: "Inicializando el mapa...",
      });
    } else {
      toast({
        title: "Error",
        description: "Por favor, introduce una clave API válida",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] bg-gray-100 rounded-xl overflow-hidden">
      {!mapApiKeyEntered ? (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">Introduce la Clave API del Mapa</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Para usar la funcionalidad del mapa, por favor introduce tu clave API de OpenStreetMap:
            </p>
            <form onSubmit={handleSubmitApiKey}>
              <input
                type="text"
                value={mapApiKey}
                onChange={(e) => setMapApiKey(e.target.value)}
                placeholder="Introduce tu clave API de OpenStreetMap"
                className="input-search mb-4"
              />
              <Button 
                type="submit" 
                className="w-full bg-barcelona-blue text-white"
              >
                Configurar Clave API
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <>
          {!mapLoaded ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 border-t-4 border-barcelona-blue rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Cargando mapa...</p>
            </div>
          ) : (
            <>
              {/* Map Container */}
              <div 
                ref={mapRef} 
                className="w-full h-full bg-gray-200"
                style={{
                  backgroundImage: 'url("https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/2.1734,41.3851,11.5,0/1200x800?access_token=pk.dummy")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Parking Spot Markers (Mockup) */}
                {mockParkingSpots.map((spot) => (
                  <div 
                    key={spot.id}
                    className="absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    style={{
                      left: `${Math.random() * 80 + 10}%`, 
                      top: `${Math.random() * 80 + 10}%`
                    }}
                    onClick={() => toggleSpotInfo(spot.id)}
                  >
                    <div className="relative">
                      <MapPin size={32} className="text-barcelona-blue animate-pulse-slow" fill="#dbeafe" />
                      
                      {openSpotInfoId === spot.id && (
                        <div className="absolute z-10 bg-white rounded-lg shadow-lg p-3 w-48 left-1/2 transform -translate-x-1/2 mt-1 animate-fade-in">
                          <div className="text-sm">
                            <div className="font-semibold mb-1">Plaza Disponible</div>
                            <div className="text-gray-600 text-xs mb-2">Actualizado {spot.updatedAt}</div>
                            <Button 
                              size="sm" 
                              className="w-full bg-barcelona-blue text-white text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast({
                                  title: "Direcciones",
                                  description: "Obteniendo direcciones a esta plaza de aparcamiento...",
                                });
                              }}
                            >
                              Obtener Direcciones
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-4 left-0 right-0 px-4 flex justify-center">
                <div className="bg-white rounded-full shadow-lg p-1 flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-barcelona-blue"
                    onClick={handleUseCurrentLocation}
                  >
                    <Navigation size={20} />
                  </Button>
                  <div className="h-6 border-l border-gray-200 mx-1"></div>
                  <Link to="/report">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-barcelona-orange"
                    >
                      <Plus size={20} />
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Search Bar */}
          <div className="absolute top-4 left-0 right-0 px-4">
            <div className="bg-white rounded-full shadow-lg p-1 flex items-center">
              <input 
                type="text"
                placeholder="Buscar aparcamiento cerca de..."
                className="border-none flex-grow py-2 px-4 rounded-full focus:outline-none text-sm md:text-base"
              />
              <Button
                className="rounded-full bg-barcelona-blue hover:bg-barcelona-blue/90"
                size="sm"
              >
                Buscar
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
