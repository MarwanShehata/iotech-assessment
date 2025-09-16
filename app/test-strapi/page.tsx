import React from 'react';
import { testStrapiConnection, fetchServices } from '@/lib/strapi';

const TestStrapiPage = async () => {
  const isConnected = await testStrapiConnection();
  const services = await fetchServices();
  
  return (
    <div className="p-8">
      <h1>Strapi Connection Test</h1>
      <p>Connected: {isConnected ? '✅ Yes' : '❌ No'}</p>
      <p>Services found: {services.length}</p>
      <pre>{JSON.stringify(services, null, 2)}</pre>
    </div>
  );
};

export default TestStrapiPage;