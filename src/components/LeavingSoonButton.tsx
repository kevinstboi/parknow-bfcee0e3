
import React, { useState } from 'react';
import { Car, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const LeavingSoonButton = () => {
  const { toast } = useToast();
  const [timeToLeave, setTimeToLeave] = useState<number>(5);
  const [isSharing, setIsSharing] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  
  const handleStartSharing = () => {
    // En una implementación real, aquí guardaríamos la ubicación y tiempo en la base de datos
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Simulamos obtener la dirección basada en la geolocalización
          const fakeAddress = "Carrer de Mallorca, 401";
          setLocation(fakeAddress);
          setIsSharing(true);
          
          toast({
            title: "Compartiendo ubicación",
            description: `Los usuarios sabrán que liberarás tu plaza en ${timeToLeave} minutos.`,
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
    }
  };
  
  const handleStopSharing = () => {
    setIsSharing(false);
    toast({
      title: "Compartir detenido",
      description: "Has dejado de compartir que vas a liberar tu plaza.",
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Car className="mr-2 h-5 w-5 text-barcelona-blue" />
          Voy a liberar mi plaza pronto
        </CardTitle>
        <CardDescription>
          Informa a otros usuarios que vas a liberar tu plaza de aparcamiento
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isSharing ? (
          <>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Tiempo hasta liberar la plaza</Label>
                <span className="font-medium">{timeToLeave} minutos</span>
              </div>
              <Slider
                value={[timeToLeave]}
                min={1}
                max={30}
                step={1}
                onValueChange={(value) => setTimeToLeave(value[0])}
              />
            </div>
            
            <Button 
              className="w-full bg-barcelona-blue" 
              onClick={handleStartSharing}
            >
              <Clock className="mr-2 h-4 w-4" />
              Compartir que voy a salir
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
              <div className="flex items-center text-green-800 font-medium mb-2">
                <Clock className="mr-2 h-5 w-5" />
                Compartiendo: {timeToLeave} minutos para salir
              </div>
              <div className="flex items-center text-green-700 text-sm">
                <MapPin className="mr-2 h-4 w-4" />
                {location}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleStopSharing}
            >
              Dejar de compartir
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
