import React, { useState } from 'react';
import './App.css';
import Router from './components/Router.js';
import {ServicioContext} from './components/ServicioContext.js';

function App() {
  const  [insumos, setInsumos] = useState([]);
  
  return (


    <ServicioContext.Provider value = {{
      insumos,
      setInsumos
    }}>
      <Router/>
    </ServicioContext.Provider>    
    
  );
}

export default App;
