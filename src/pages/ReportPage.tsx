
import React, { useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { ReportSpotForm } from '@/components/ReportSpotForm';
import { useToast } from '@/hooks/use-toast';

const ReportPage = () => {
  const { toast } = useToast();

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
          <ReportSpotForm />
        </div>
      </div>
    </Layout>
  );
};

export default ReportPage;
