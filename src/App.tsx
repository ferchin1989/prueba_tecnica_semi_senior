import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Home from './pages/Home';

/**
 * Componente principal de la aplicación
 * Configura las rutas y renderiza los componentes correspondientes
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Aquí se pueden agregar más rutas según sea necesario */}
      </Routes>
    </Router>
  );
}

export default App;
