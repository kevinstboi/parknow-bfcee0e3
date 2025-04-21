
import React, { useRef, useEffect, useState } from 'react';
import { MapPin, Navigation, Plus, Home, Briefcase, Pin, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger, 
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from '@/components/ui/drawer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { ParkingSpot } from '@/pages/MapPage';

// Clave de API de Google Maps
const API_KEY = 'AIzaSyDPSvqhfdHJRfCEqYk0WzZ6_LLRHXPDcZ8';

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

// Tipo para los puntos de interés
interface PointOfInterest {
  id: number;
  lat: number;
  lng: number;
  name: string;
  type: 'home' | 'work' | 'favorite';
}

interface MapComponentProps {
  parkingSpots: ParkingSpot[];
}

export const MapComponent = ({ parkingSpots = [] }: MapComponentProps) => {
  const { toast } = useToast();
  const [openSpotInfoId, setOpenSpotInfoId] = useState<number | null>(null);
  const [userPosition, setUserPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [pointsOfInterest, setPointsOfInterest] = useState<PointOfInterest[]>([]);
  const [showAddPoiDialog, setShowAddPoiDialog] = useState(false);
  const [newPoiName, setNewPoiName] = useState('');
  const [newPoiType, setNewPoiType] = useState<'home' | 'work' | 'favorite'>('home');
  
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
    const spot = parkingSpots.find(s => s.id === spotId);
    setSelectedSpot(spot || null);
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

  const handleAddPointOfInterest = () => {
    if (!userPosition) {
      toast({
        title: "Error",
        description: "Necesitamos tu ubicación para añadir un punto de interés.",
        variant: "destructive",
      });
      return;
    }

    if (!newPoiName.trim()) {
      toast({
        title: "Error",
        description: "Por favor, ingresa un nombre para el punto de interés.",
        variant: "destructive",
      });
      return;
    }

    const newPoi: PointOfInterest = {
      id: Date.now(),
      lat: userPosition.lat,
      lng: userPosition.lng,
      name: newPoiName,
      type: newPoiType,
    };

    setPointsOfInterest(prev => [...prev, newPoi]);
    setShowAddPoiDialog(false);
    setNewPoiName('');

    toast({
      title: "Punto de interés añadido",
      description: `${newPoiName} ha sido añadido a tus lugares.`,
    });
  };

  const handleDeletePoi = (poiId: number) => {
    setPointsOfInterest(prev => prev.filter(poi => poi.id !== poiId));
    
    toast({
      title: "Punto eliminado",
      description: "El punto de interés ha sido eliminado.",
    });
  };

  const getPoiIcon = (type: 'home' | 'work' | 'favorite') => {
    switch (type) {
      case 'home':
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='%23eab308' stroke='%23854d0e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9 22 9 12 15 12 15 22'/%3E%3C/svg%3E";
      case 'work':
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='%23a855f7' stroke='%236b21a8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='20' height='14' x='2' y='7' rx='2' ry='2'/%3E%3Cpath d='M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'/%3E%3C/svg%3E";
      case 'favorite':
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='%23ef4444' stroke='%23991b1b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z'/%3E%3C/svg%3E";
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

  // Ensure parkingSpots is an array even if it's undefined
  const availableSpots = Array.isArray(parkingSpots) 
    ? parkingSpots.filter(spot => spot.available) 
    : [];

  return (
    <div className="relative h-[calc(100vh-15rem)] md:h-[calc(100vh-13rem)] bg-gray-100 rounded-xl overflow-hidden">
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
          
          {/* Marcadores de plazas de aparcamiento (solo las disponibles) */}
          {availableSpots.map((spot) => (
            <Marker
              key={spot.id}
              position={{ lat: spot.lat, lng: spot.lng }}
              onClick={() => toggleSpotInfo(spot.id)}
              icon={{
                url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='%23dbeafe' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E",
                scaledSize: new google.maps.Size(36, 36),
                anchor: new google.maps.Point(18, 36),
              }}
            />
          ))}

          {/* Marcadores para puntos de interés */}
          {pointsOfInterest.map((poi) => (
            <Marker
              key={poi.id}
              position={{ lat: poi.lat, lng: poi.lng }}
              onClick={() => {
                toast({
                  title: poi.name,
                  description: `Punto de interés: ${poi.type === 'home' ? 'Casa' : poi.type === 'work' ? 'Trabajo' : 'Favorito'}`
                });
              }}
              icon={{
                url: getPoiIcon(poi.type),
                scaledSize: new google.maps.Size(36, 36),
                anchor: new google.maps.Point(18, 18),
              }}
            />
          ))}
        </GoogleMap>
      </div>

      {/* Controles del Mapa - Ahora adaptados a formato app */}
      <div className="absolute bottom-20 right-4">
        <div className="flex flex-col space-y-2">
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-barcelona-blue shadow-lg"
            onClick={handleUseCurrentLocation}
          >
            <Navigation size={20} />
          </Button>
          
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-emerald-500 shadow-lg"
            onClick={() => setShowAddPoiDialog(true)}
          >
            <Pin size={20} />
          </Button>
          
          <Link to="/report">
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-barcelona-orange shadow-lg"
            >
              <Plus size={20} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Barra de Búsqueda - Adaptada a formato app */}
      <div className="absolute top-4 left-0 right-0 px-4">
        <div className="bg-white rounded-full shadow-lg p-1 flex items-center">
          <input 
            type="text"
            placeholder="Buscar aparcamiento cerca de..."
            className="border-none flex-grow py-2 px-4 rounded-full focus:outline-none text-sm"
          />
          <Button
            size="sm"
            className="rounded-full bg-barcelona-blue hover:bg-barcelona-blue/90"
          >
            <MapPin size={16} />
          </Button>
        </div>
      </div>

      {/* Drawer para mostrar detalles de la plaza - Típico de apps móviles */}
      <Drawer open={!!selectedSpot} onOpenChange={(open) => !open && setSelectedSpot(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Plaza de Aparcamiento</DrawerTitle>
            <DrawerDescription>
              {selectedSpot?.updatedAt && `Última actualización: ${selectedSpot.updatedAt}`}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span>Disponible ahora</span>
              </div>
              <p className="text-sm text-gray-500">
                Esta plaza de aparcamiento está disponible para su uso. Asegúrate de comprobar las restricciones locales antes de aparcar.
              </p>
            </div>
          </div>
          <DrawerFooter>
            <Button className="w-full bg-barcelona-blue text-white">
              Obtener Direcciones
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cerrar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Diálogo para añadir puntos de interés */}
      <AlertDialog open={showAddPoiDialog} onOpenChange={setShowAddPoiDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Añadir Punto de Interés</AlertDialogTitle>
            <AlertDialogDescription>
              Añade un lugar donde sueles buscar aparcamiento.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="poi-name" className="text-sm font-medium">
                Nombre del lugar
              </label>
              <Input
                id="poi-name"
                placeholder="Ej: Mi casa, Mi trabajo..."
                value={newPoiName}
                onChange={(e) => setNewPoiName(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Tipo de lugar</label>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={newPoiType === 'home' ? 'default' : 'outline'}
                  className={`flex-1 ${newPoiType === 'home' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                  onClick={() => setNewPoiType('home')}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Casa
                </Button>
                <Button
                  type="button"
                  variant={newPoiType === 'work' ? 'default' : 'outline'}
                  className={`flex-1 ${newPoiType === 'work' ? 'bg-purple-500 hover:bg-purple-600' : ''}`}
                  onClick={() => setNewPoiType('work')}
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Trabajo
                </Button>
                <Button
                  type="button"
                  variant={newPoiType === 'favorite' ? 'default' : 'outline'}
                  className={`flex-1 ${newPoiType === 'favorite' ? 'bg-red-500 hover:bg-red-600' : ''}`}
                  onClick={() => setNewPoiType('favorite')}
                >
                  <Star className="mr-2 h-4 w-4" />
                  Favorito
                </Button>
              </div>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAddPointOfInterest}>
              Añadir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Lista de puntos de interés guardados */}
      {pointsOfInterest.length > 0 && (
        <div className="absolute bottom-20 left-4 bg-white shadow-lg rounded-lg p-2 max-h-48 overflow-y-auto w-48">
          <h3 className="text-sm font-semibold mb-2 px-2">Mis lugares</h3>
          <ul className="space-y-1">
            {pointsOfInterest.map(poi => (
              <li key={poi.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded text-xs">
                <button 
                  className="flex items-center flex-grow text-left"
                  onClick={() => {
                    if (mapRef.current) {
                      mapRef.current.panTo({ lat: poi.lat, lng: poi.lng });
                      mapRef.current.setZoom(16);
                    }
                  }}
                >
                  {poi.type === 'home' && <Home size={14} className="mr-1 text-yellow-500" />}
                  {poi.type === 'work' && <Briefcase size={14} className="mr-1 text-purple-500" />}
                  {poi.type === 'favorite' && <Star size={14} className="mr-1 text-red-500" />}
                  <span className="truncate">{poi.name}</span>
                </button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => handleDeletePoi(poi.id)}
                >
                  <X size={12} />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
