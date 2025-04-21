
import React from 'react';
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
import { Car, MapPin, Clock } from 'lucide-react';
import { ParkingSpot } from '@/pages/MapPage';

interface LeavingSoonDialogProps {
  spot: ParkingSpot;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNotify: () => void;
}

export const LeavingSoonDialog = ({ spot, open, onOpenChange, onNotify }: LeavingSoonDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center text-barcelona-blue">
            <Car className="mr-2 h-5 w-5" />
            Alguien va a liberar su plaza pronto
          </AlertDialogTitle>
          <AlertDialogDescription>
            Un usuario ha informado que va a liberar su plaza en breve.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="py-4">
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <div className="flex items-start">
              <MapPin className="text-barcelona-blue mt-1 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium">{spot.location}</p>
                <p className="text-sm text-gray-500">A pocos minutos de tu zona favorita</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Clock className="text-red-500 mr-2" />
              <p className="text-red-600 font-medium">
                Disponible en aproximadamente {spot.leavingTime} minutos
              </p>
            </div>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Ignorar</AlertDialogCancel>
          <AlertDialogAction onClick={onNotify} className="bg-barcelona-blue">
            Notificarme cuando esté libre
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
