
import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/Layout';
import { ReportSpotForm } from '@/components/ReportSpotForm';
import { useToast } from '@/hooks/use-toast';
import { LeavingSoonButton } from '@/components/LeavingSoonButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, ThumbsUp, Bell } from 'lucide-react';

const ReportPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('report');

  useEffect(() => {
    // Informar al usuario sobre la necesidad de permitir acceso a la ubicación y orientación
    toast({
      title: "Acceso requerido",
      description: "Para reportar una plaza, necesitamos acceder a tu ubicación, orientación y sensores de movimiento para verificar que estás en la calle."
    });
  }, []);

  return (
    <Layout>
      <div className="container px-4 mx-auto py-6">
        <div className="max-w-xl mx-auto">
          <Tabs defaultValue="report" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-8">
              <TabsTrigger value="report" className="flex items-center">
                <Car className="mr-2 h-4 w-4" />
                Reportar Plaza
              </TabsTrigger>
              <TabsTrigger value="leaving" className="flex items-center">
                <Car className="mr-2 h-4 w-4" />
                Voy a Salir
              </TabsTrigger>
            </TabsList>
            <TabsContent value="report">
              <ReportSpotForm />
            </TabsContent>
            <TabsContent value="leaving">
              <LeavingSoonButton />
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h3 className="flex items-center text-amber-800 font-medium mb-2">
              <ThumbsUp className="mr-2 h-5 w-5" />
              Sistema de Votos
            </h3>
            <p className="text-sm text-amber-700">
              Tus reportes de plazas serán evaluados por otros usuarios. 
              Si tus reportes son precisos, ganarás más visibilidad y puntos. 
              Los reportes falsos pueden reducir tu reputación.
            </p>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="flex items-center text-blue-800 font-medium mb-2">
              <Bell className="mr-2 h-5 w-5" />
              Notificaciones
            </h3>
            <p className="text-sm text-blue-700">
              Recibirás notificaciones cuando alguien reporte una plaza libre en tus 
              zonas favoritas. También cuando alguien indique que va a liberar una plaza cerca de ti.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportPage;
