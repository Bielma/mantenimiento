import React, {Component} from 'react';
import Header from './Header.js';
import Footer from './Footer.js';

class Home extends Component{
    render(){
        return(
            
            <div className = "Home">
                <Header user = {'as'}/>
                

                
                    
                    <div className="container">
                        <h1 className="mt-5">Proyecto Sem-ISW 2020A</h1>
                        
                        <p className = "lead"> 
                        <br/>
                            Desarrollar un sistema que gestione la información de las ordenes de servicio técnico en una empresa de mantenimiento.  El desarrollo se compone del diseño arquitectónico y el producto de software. La construcción del sistema facilitará el desarrollo de habilidades mínimas requeridas para la acreditación de las asignaturas “Ingeniería de Software” y “Seminario de Ingeniería de Software”.  El sistema se compone de los siguientes módulos:
                            
                        </p>
                        <p>
                            <br/>

                        </p>
                        <ul  >
                            <li >Clientes (Registro, Consulta)</li>
                            <li >Empleados (Registro, Consulta)</li>
                            <li >Insumos (Registro, Consulta)</li>
                            <li >Orden de Servicio (Registro, Seguimiento, Consulta)</li>
                        </ul>
                        <p > 
                            <br/>                           
                            <a href="https://github.com/Bielma/mantenimiento">Repositorio del proyecto</a>
                        </p>
                        
                        <br/>
                        <a href="http://localhost:3000/login" className="btn btn-primary">Continuar</a>
                    </div>
            
                <Footer/>

            </div>
        );
    }
}

export default Home;