
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Navigation } from 'lucide-react';

export const ReportSpotForm = () => {
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState('');
  
  useEffect(() => {
    // Intentar obtener la ubicación del usuario al cargar el componente
    getUserLocation();
  }, []);
  
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
