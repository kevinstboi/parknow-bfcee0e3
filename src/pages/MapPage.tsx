
import React from 'react';
import { Layout } from '@/components/Layout';
import { MapComponent } from '@/components/MapComponent';

const MapPage = () => {
  return (
    <Layout>
      <div className="container px-4 mx-auto py-6">
        <h1 className="text-2xl font-bold mb-4">Buscar Plazas de Aparcamiento</h1>
        <div className="mb-8">
          <MapComponent />
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
