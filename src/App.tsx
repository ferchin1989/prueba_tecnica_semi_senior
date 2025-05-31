import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

/**
 * Componente principal de la aplicación
 * Configura las rutas y renderiza los componentes correspondientes
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/mujer" element={<Home />} />
        <Route path="/hombre" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
