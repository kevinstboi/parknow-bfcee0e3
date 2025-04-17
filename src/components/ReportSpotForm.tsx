
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Navigation, Compass, MapPin, MapPinOff } from 'lucide-react';

export const ReportSpotForm = () => {
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState('');
  const [heading, setHeading] = useState<number | null>(null);
  const [compassAvailable, setCompassAvailable] = useState(false);
  const [isOnStreet, setIsOnStreet] = useState(false);
  const [lastMotionTimestamp, setLastMotionTimestamp] = useState<number | null>(null);
  const [motionDataCount, setMotionDataCount] = useState(0);
  
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
    
    // Check for device motion support to determine if user is on street
    if (window.DeviceMotionEvent) {
      // Request motion permission for iOS devices
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        (DeviceMotionEvent as any).requestPermission()
          .then((permissionState: string) => {
            if (permissionState === 'granted') {
              window.addEventListener('devicemotion', handleMotion);
            } else {
              toast({
                title: "Acceso a sensores de movimiento denegado",
                description: "No podemos verificar si estás en la calle.",
                variant: "destructive"
              });
            }
          })
          .catch(console.error);
      } else {
        // For non-iOS devices
        window.addEventListener('devicemotion', handleMotion);
      }
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, []);
  
  useEffect(() => {
    // Intentar obtener la ubicación del usuario al cargar el componente
    getUserLocation();
  }, []);

  const handleMotion = (event: DeviceMotionEvent) => {
    const now = Date.now();
    
    // Only process if we have acceleration data
    if (event.acceleration && 
        (event.acceleration.x !== null || 
         event.acceleration.y !== null || 
         event.acceleration.z !== null)) {
      
      setMotionDataCount(prev => prev + 1);
      
      // Get acceleration magnitude (excluding gravity)
      const accelX = event.acceleration.x || 0;
      const accelY = event.acceleration.y || 0;
      const accelZ = event.acceleration.z || 0;
      
      const accelMagnitude = Math.sqrt(accelX * accelX + accelY * accelY + accelZ * accelZ);
      
      // Threshold to determine significant motion (someone walking)
      const MOTION_THRESHOLD = 1.2; // m/s²
      
      if (accelMagnitude > MOTION_THRESHOLD) {
        setLastMotionTimestamp(now);
      }
      
      // Check if there was significant motion in the last 2 minutes
      const TWO_MINUTES = 2 * 60 * 1000;
      if (lastMotionTimestamp && (now - lastMotionTimestamp) < TWO_MINUTES) {
        setIsOnStreet(true);
      } else {
        // If no significant motion for 2 minutes, probably not on street
        if (motionDataCount > 10) { // Make sure we've received enough samples
          setIsOnStreet(false);
        }
      }
    }
  };
  
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
    
    if (!isOnStreet) {
      toast({
        title: "Error",
        description: "Para reportar una plaza, debes estar en la calle.",
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
      timestamp: new Date().toISOString(),
      isOnStreet: isOnStreet
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
      
      {/* Street Verification Section */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">Estado</label>
        
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <div className={`flex items-center px-4 py-3 rounded-full ${isOnStreet ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'} w-full`}>
              {isOnStreet 
                ? <MapPin size={18} className="mr-2" />
                : <MapPinOff size={18} className="mr-2" />}
              {isOnStreet 
                ? 'En la calle (verificado)' 
                : 'No estás en la calle'}
            </div>
          </div>
          
          {!isOnStreet && (
            <div className="text-sm text-amber-500">
              <p>Debes estar caminando en la calle para reportar una plaza.</p>
              <p>El sistema detectará automáticamente cuando estés en movimiento.</p>
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
        disabled={isSubmitting || !userLocation || !isOnStreet}
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

