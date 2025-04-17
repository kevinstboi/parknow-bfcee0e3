
import React from 'react';
import { Check, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ParkingSpotDialogProps {
  spot: {
    id: number;
    location: string;
    updatedAt: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onParked: (spotId: number) => void;
  onContinueSearching: (spotId: number) => void;
}

export function ParkingSpotDialog({
  spot,
  open,
  onOpenChange,
  onParked,
  onContinueSearching
}: ParkingSpotDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>¿Has encontrado aparcamiento?</DialogTitle>
          <DialogDescription>
            Has llegado a {spot.location} donde se reportó una plaza libre {spot.updatedAt}.
            ¿Está disponible o ya ha sido ocupada?
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            onClick={() => onParked(spot.id)}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700"
          >
            <Check className="h-5 w-5" />
            He aparcado
          </Button>
          <Button
            onClick={() => onContinueSearching(spot.id)}
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            Seguir buscando
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
