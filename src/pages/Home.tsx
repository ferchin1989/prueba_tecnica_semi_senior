import React from 'react';
import Layout from '../components/layout/Layout';
import Banner from '../components/ui/Banner';
import ProductSlider from '../components/ui/ProductSlider';
import PromoBanner from '../components/ui/PromoBanner';

/**
 * Pu00e1gina principal que muestra el banner y el slider de productos
 */
const Home: React.FC = () => {
  return (
    <Layout>
      <Banner />
      <ProductSlider />
      <PromoBanner />
    </Layout>
  );
};

export default Home;
