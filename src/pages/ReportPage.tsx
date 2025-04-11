
import React from 'react';
import { Layout } from '@/components/Layout';
import { ReportSpotForm } from '@/components/ReportSpotForm';

const ReportPage = () => {
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
