
import React from 'react';
import { Layout } from '@/components/Layout';
import { AuthForm } from '@/components/AuthForm';

const LoginPage = () => {
  return (
    <Layout>
      <div className="container px-4 mx-auto py-8">
        <div className="max-w-md mx-auto">
          <AuthForm type="login" />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
