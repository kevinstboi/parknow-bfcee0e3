
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Navigation } from 'lucide-react';

export const ReportSpotForm = () => {
  const { toast } = useToast();
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "¡Plaza reportada con éxito!",
        description: "Has ganado 5 puntos por tu contribución.",
      });
      
      // Reset form
      setAddress('');
      setNotes('');
      setUseCurrentLocation(true);
    }, 1500);
  };
  
  const handleUseMyLocation = () => {
    setUseCurrentLocation(true);
    toast({
      title: "Usando ubicación actual",
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Reportar una Plaza Libre</h2>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2 font-medium">Ubicación</label>
        
        <div className="flex items-center mb-3">
          <button
            type="button"
            className={`flex items-center px-4 py-2 rounded-full mr-3 ${
              useCurrentLocation 
                ? 'bg-barcelona-blue text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={handleUseMyLocation}
          >
            <Navigation size={16} className="mr-2" />
            Mi Ubicación
          </button>
          
          <button
            type="button"
            className={`flex items-center px-4 py-2 rounded-full ${
              !useCurrentLocation 
                ? 'bg-barcelona-blue text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setUseCurrentLocation(false)}
          >
            <MapPin size={16} className="mr-2" />
            Dirección Personalizada
          </button>
        </div>
        
        {!useCurrentLocation && (
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Introduce la dirección"
            className="input-search"
            required={!useCurrentLocation}
          />
        )}
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
        disabled={isSubmitting || (!useCurrentLocation && !address)}
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
