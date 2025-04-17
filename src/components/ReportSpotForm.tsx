
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Navigation, Compass } from 'lucide-react';

export const ReportSpotForm = () => {
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState('');
  const [heading, setHeading] = useState<number | null>(null);
  const [compassAvailable, setCompassAvailable] = useState(false);
  
  useEffect(() => {
    // Check if device orientation is supported
    if (window.DeviceOrientationEvent) {
      setCompassAvailable(true);
      
      // Request permission for iOS devices
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        (DeviceOrientationEvent as any).requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            } else {
              setCompassAvailable(false);
              toast({
                title: "Acceso a brújula denegado",
                description: "No podemos determinar la dirección de estacionamiento.",
                variant: "destructive"
              });
            }
          })
          .catch(console.error);
      } else {
        // For non-iOS devices
        window.addEventListener('deviceorientation', handleOrientation);
      }
    } else {
      setCompassAvailable(false);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);
  
  useEffect(() => {
    // Intentar obtener la ubicación del usuario al cargar el componente
    getUserLocation();
  }, []);
  
  const handleOrientation = (event: DeviceOrientationEvent) => {
    // Alpha is the compass direction the device is facing in degrees
    if (event.alpha !== null) {
      setHeading(Math.round(event.alpha));
    }
  };
  
  const getHeadingLabel = (degrees: number | null): string => {
    if (degrees === null) return "Desconocida";
    
    if (degrees >= 337.5 || degrees < 22.5) return "Norte";
    if (degrees >= 22.5 && degrees < 67.5) return "Noreste";
    if (degrees >= 67.5 && degrees < 112.5) return "Este";
    if (degrees >= 112.5 && degrees < 157.5) return "Sureste";
    if (degrees >= 157.5 && degrees < 202.5) return "Sur";
    if (degrees >= 202.5 && degrees < 247.5) return "Suroeste";
    if (degrees >= 247.5 && degrees < 292.5) return "Oeste";
    if (degrees >= 292.5 && degrees < 337.5) return "Noroeste";
    
    return "Desconocida";
  };
  
  const getUserLocation = () => {
    setLocationError('');
    
    if (navigator.geolocation) {
      toast({
        title: "Obteniendo ubicación...",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          
          toast({
            title: "Ubicación obtenida correctamente",
          });
        },
        (error) => {
          console.error("Error al obtener ubicación:", error);
          setLocationError('No se pudo acceder a tu ubicación. Por favor, asegúrate de permitir el acceso a la ubicación.');
          
          toast({
            title: "Error al obtener ubicación",
            description: "Por favor, asegúrate de permitir el acceso a la ubicación.",
            variant: "destructive"
          });
        }
      );
    } else {
      setLocationError('Tu navegador no soporta geolocalización.');
      
      toast({
        title: "Error",
        description: "Tu navegador no soporta geolocalización.",
        variant: "destructive"
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userLocation) {
      toast({
        title: "Error",
        description: "Es necesario tener la ubicación para reportar una plaza.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Data that would be sent to an API
    const reportData = {
      location: userLocation,
      heading: heading,
      headingLabel: getHeadingLabel(heading),
      notes: notes,
      timestamp: new Date().toISOString()
    };
    
    console.log("Sending report data:", reportData);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "¡Plaza reportada con éxito!",
        description: "Has ganado 5 puntos por tu contribución.",
      });
      
      // Reset form
      setNotes('');
    }, 1500);
  };
  
  const getCompassStyle = (heading: number | null) => {
    return {
      transform: heading !== null ? `rotate(${360 - heading}deg)` : 'rotate(0deg)',
      transition: 'transform 0.3s ease-in-out'
    };
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Reportar una Plaza Libre</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">Ubicación</label>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <div className={`flex items-center px-4 py-3 rounded-full ${userLocation ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'} w-full`}>
              <Navigation size={18} className="mr-2" />
              {userLocation 
                ? 'Ubicación actual detectada' 
                : 'Esperando ubicación...'}
            </div>
          </div>
          
          {locationError && (
            <div className="text-red-500 flex flex-col space-y-2">
              <p>{locationError}</p>
              <Button 
                type="button" 
                onClick={getUserLocation}
                variant="outline" 
                className="text-barcelona-blue border-barcelona-blue"
              >
                Intentar nuevamente
              </Button>
            </div>
          )}
          
          {userLocation && (
            <div className="text-sm text-gray-500">
              Se utilizará tu ubicación actual para reportar la plaza disponible.
            </div>
          )}
        </div>
      </div>
      
      {/* Compass Section */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">Orientación</label>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <div className={`flex items-center px-4 py-3 rounded-full ${heading !== null ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'} w-full`}>
              <Compass size={18} className="mr-2" style={getCompassStyle(heading)} />
              {heading !== null 
                ? `Dirección: ${getHeadingLabel(heading)} (${heading}°)` 
                : compassAvailable 
                  ? 'Calculando dirección...' 
                  : 'Brújula no disponible'}
            </div>
          </div>
          
          {compassAvailable && heading !== null && (
            <div className="flex justify-center items-center h-32">
              <div className="relative w-24 h-24 rounded-full border-2 border-barcelona-blue flex items-center justify-center">
                <div className="absolute top-0 w-1 h-4 bg-barcelona-blue mx-auto"></div>
                <div className="absolute bottom-0 w-1 h-4 bg-gray-300 mx-auto"></div>
                <div className="absolute left-0 h-1 w-4 bg-gray-300 my-auto"></div>
                <div className="absolute right-0 h-1 w-4 bg-gray-300 my-auto"></div>
                <div 
                  className="h-16 w-1 bg-barcelona-orange origin-bottom absolute bottom-1/2" 
                  style={getCompassStyle(heading)}
                ></div>
                <div className="text-xs text-barcelona-blue font-bold">N</div>
              </div>
            </div>
          )}
          
          {!compassAvailable && (
            <div className="text-sm text-gray-500">
              Tu dispositivo no soporta la función de brújula o has denegado el permiso.
              Se reportará la plaza sin información de orientación.
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="notes" className="block text-gray-700 mb-2 font-medium">
          Notas (Opcional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="¿Algún detalle sobre esta plaza? (ej., 'Cerca de la esquina', 'Lo suficientemente grande para un SUV')"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-barcelona-blue h-24 resize-none"
        />
      </div>
      
      <Button
        type="submit"
        className="w-full bg-barcelona-orange hover:bg-barcelona-orange/90 text-white font-medium py-3 rounded-full"
        disabled={isSubmitting || !userLocation}
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
            Reportando Plaza...
          </div>
        ) : (
          'Reportar Plaza'
        )}
      </Button>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        ¡Ganarás 5 puntos por reportar una plaza disponible!
      </p>
    </form>
  );
};
