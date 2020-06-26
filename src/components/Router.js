import React, {Component} from 'react';
import {BrowserRouter, Route, Switch}from 'react-router-dom';
import Home from './Home.js';
import SignIn from './SignIn.js';
import NuevaOrdenServicio from './orden_servicio/NuevaOrdenServicio.js';
import Servicios from './orden_servicio/Servicios.js';
import EmpleadoForm from './empleados/EmpleadoForm.js'
import Empleados from './empleados/Empleados.js'
import InsumoForm from './insumos/InsumoForm.js';
import Insumos from './insumos/Insumos.js';
class Router extends Component{
    render(){
        return(
            <BrowserRouter>
            <Switch>
                <Route exact path = "/" component={Home}/>              
                <Route exact path = "/login" component={SignIn}/>  
                <Route exact path = "/orden_servicio" component={NuevaOrdenServicio}/>  
                <Route exact path = "/new_empleado" component={EmpleadoForm}/>  
                <Route exact path = "/empleados" component = {Empleados}/>  
                <Route exact path = "/new_insumo" component = {InsumoForm}/>  
                <Route exact path = "/insumos" component = {Insumos}/>  
                <Route exact path = "/servicios" component = {Servicios} />  
            </Switch>
            </BrowserRouter>
        ); 
    }

    
}

export default Router;