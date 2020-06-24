import React from 'react';
import './App.css';
import Router from './components/Router.js';
import RegistrarClientes from './components/clientes/RegistrarClientes';
import EmpleadoForm from './components/empleados/EmpleadoForm';
import InsumoForm from './components/insumos/InsumoForm';

function App() {
  return (
    <InsumoForm/>
    //<Router/>
  );
}

export default App;
