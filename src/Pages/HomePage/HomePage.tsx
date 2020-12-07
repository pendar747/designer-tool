import React from 'react';
import ComponentLibrary from '../../components/ComponentLibrary/ComponentLibrary';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return <div style={{ width: '100%' }}>
    <ComponentLibrary />
  </div>;
}

export default HomePage;