
import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Navigation, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// Clave de API de Google Maps
const API_KEY = 'AIzaSyDPSvqhfdHJRfCEqYk0WzZ6_LLRHXPDcZ8';

// Datos de ejemplo para plazas de aparcamiento
const mockParkingSpots = [
  { id: 1, lat: 41.3851, lng: 2.1734, available: true, updatedAt: 'hace 10 mins' },
  { id: 2, lat: 41.3870, lng: 2.1698, available: true, updatedAt: 'hace 15 mins' },
  { id: 3, lat: 41.3917, lng: 2.1649, available: true, updatedAt: 'hace 30 mins' },
  { id: 4, lat: 41.3948, lng: 2.1545, available: true, updatedAt: 'hace 1 hora' },
  { id: 5, lat: 41.4012, lng: 2.1741, available: true, updatedAt: 'hace 2 horas' },
];

// Estilo del contenedor del mapa
const containerStyle = {
  width: '100%',
  height: '100%'
};

// Centro inicial del mapa (Barcelona)
const center = {
  lat: 41.3851,
  lng: 2.1734
};

export const MapComponent = () => {
  const { toast } = useToast();
  const [openSpotInfoId, setOpenSpotInfoId] = useState<number | null>(null);
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
  
  // Cargar la API de Google Maps
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  });

  // Referencia al mapa
  const mapRef = useRef<google.maps.Map | null>(null);
  
  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    toast({
      title: "Mapa cargado correctamente",
      description: "Mostrando plazas de aparcamiento disponibles en Barcelona.",
    });
  };
  
  const toggleSpotInfo = (spotId: number) => {
    setOpenSpotInfoId(openSpotInfoId === spotId ? null : spotId);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserPosition(pos);
          
          if (mapRef.current) {
            mapRef.current.panTo(pos);
            mapRef.current.setZoom(15);
          }
          
          toast({
            title: "Usando ubicación actual",
            description: "Buscando plazas de aparcamiento cerca de ti...",
          });
        },
        () => {
          toast({
            title: "Error",
            description: "No se pudo acceder a tu ubicación.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Tu navegador no soporta geolocalización.",
        variant: "destructive",
      });
    }
  };

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
          <h3 className="text-lg font-semibold mb-4 text-center">Error al cargar el mapa</h3>
          <p className="text-gray-600 mb-4 text-sm">
            No se pudo cargar el mapa de Google Maps. Por favor, inténtalo de nuevo más tarde.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-t-4 border-barcelona-blue rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="relative h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] bg-gray-100 rounded-xl overflow-hidden">
      {/* Contenedor del Mapa */}
      <div className="w-full h-full">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userPosition || center}
          zoom={13}
          onLoad={onMapLoad}
          options={{
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            zoomControl: true,
          }}
        >
          {/* Marcador de posición del usuario */}
          {userPosition && (
            <Marker
              position={userPosition}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                fillColor: "#4285F4",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
              }}
            />
          )}
          
          {/* Marcadores de plazas de aparcamiento */}
          {mockParkingSpots.map((spot) => (
            <Marker
              key={spot.id}
              position={{ lat: spot.lat, lng: spot.lng }}
              onClick={() => toggleSpotInfo(spot.id)}
              icon={{
                url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='%23dbeafe' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E",
                scaledSize: new google.maps.Size(36, 36),
                anchor: new google.maps.Point(18, 36),
              }}
            >
              {openSpotInfoId === spot.id && (
                <InfoWindow onCloseClick={() => setOpenSpotInfoId(null)}>
                  <div className="p-1">
                    <div className="font-semibold mb-1">Plaza Disponible</div>
                    <div className="text-gray-600 text-xs mb-2">Actualizado {spot.updatedAt}</div>
                    <Button 
                      size="sm" 
                      className="w-full bg-barcelona-blue text-white text-xs"
                      onClick={() => {
                        toast({
                          title: "Direcciones",
                          description: "Obteniendo direcciones a esta plaza de aparcamiento...",
                        });
                      }}
                    >
                      Obtener Direcciones
                    </Button>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </div>

      {/* Controles del Mapa */}
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

      {/* Barra de Búsqueda */}
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
    </div>
  );
};
