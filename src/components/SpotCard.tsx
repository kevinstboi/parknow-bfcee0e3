
import React, { useState } from 'react';
import { Clock, MapPin, Navigation, ThumbsUp, ThumbsDown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SpotCardProps {
  id: number;
  location: string;
  distance: string;
  availableSince: string;
  reportedBy: string;
}

export const SpotCard = ({ id, location, distance, availableSince, reportedBy }: SpotCardProps) => {
  const { toast } = useToast();
  const [voteStatus, setVoteStatus] = useState<'upvoted' | 'downvoted' | null>(null);
  const [upvotes, setUpvotes] = useState<number>(Math.floor(Math.random() * 5));
  const [downvotes, setDownvotes] = useState<number>(Math.floor(Math.random() * 2));
  
  const handleGetDirections = () => {
    toast({
      title: "Obteniendo direcciones",
      description: `Cargando direcciones a ${location}...`,
    });
  };

  const handleUpvote = () => {
    if (voteStatus === 'upvoted') {
      setVoteStatus(null);
      setUpvotes(prev => prev - 1);
    } else {
      if (voteStatus === 'downvoted') {
        setDownvotes(prev => prev - 1);
      }
      setVoteStatus('upvoted');
      setUpvotes(prev => prev + 1);
    }
    
    toast({
      title: "Gracias por tu voto",
      description: "Has indicado que este reporte fue útil.",
    });
  };

  const handleDownvote = () => {
    if (voteStatus === 'downvoted') {
      setVoteStatus(null);
      setDownvotes(prev => prev - 1);
    } else {
      if (voteStatus === 'upvoted') {
        setUpvotes(prev => prev - 1);
      }
      setVoteStatus('downvoted');
      setDownvotes(prev => prev + 1);
    }
    
    toast({
      title: "Gracias por tu voto",
      description: "Has indicado que este reporte no fue útil.",
    });
  };
  
  return (
    <div className="card-spot p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center text-barcelona-blue">
          <MapPin size={16} className="mr-1" />
          <span className="font-medium">{location}</span>
        </div>
        <span className="text-sm text-gray-500">{distance}</span>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-3">
        <Clock size={14} className="mr-1" />
        <span>Disponible desde {availableSince}</span>
      </div>
      
      <div className="flex items-center text-xs text-gray-500 mb-3">
        <User size={14} className="mr-1" />
        <span>Reportado por {reportedBy}</span>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleUpvote}
            className={`flex items-center space-x-1 ${voteStatus === 'upvoted' ? 'text-green-600' : 'text-gray-500'}`}
          >
            <ThumbsUp size={14} />
            <span>{upvotes}</span>
          </button>
          
          <button 
            onClick={handleDownvote}
            className={`flex items-center space-x-1 ${voteStatus === 'downvoted' ? 'text-red-600' : 'text-gray-500'}`}
          >
            <ThumbsDown size={14} />
            <span>{downvotes}</span>
          </button>
        </div>
        
        <Button 
          size="sm" 
          className="flex items-center bg-barcelona-blue hover:bg-barcelona-blue/90"
          onClick={handleGetDirections}
        >
          <Navigation size={14} className="mr-1" />
          <span>Ir</span>
        </Button>
      </div>
    </div>
  );
};
