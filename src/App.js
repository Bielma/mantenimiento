import React, { useState } from 'react';
import './App.css';
import Router from './components/Router.js';
import {ServicioContext} from './components/ServicioContext.js';

function App() {
  const  [insumos, setInsumos] = useState([]);
  const [succes, setSucces] = useState(false);  
  return (
    <ServicioContext.Provider value = {{
      insumos,
      setInsumos,
      succes,
      setSucces
    }}>
      <Router/>
    </ServicioContext.Provider>    
    
  );
}

export default App;
