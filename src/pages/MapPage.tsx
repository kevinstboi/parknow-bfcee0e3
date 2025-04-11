
import React from 'react';
import { Layout } from '@/components/Layout';
import { MapComponent } from '@/components/MapComponent';

const MapPage = () => {
  return (
    <Layout>
      <div className="px-4 py-4">
        <h1 className="text-xl font-bold mb-3">Buscar Plazas de Aparcamiento</h1>
        <div className="mb-8">
          <MapComponent />
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
