import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { Button } from 'react-bootstrap';
import {Redirect } from 'react-router-dom';  
import XDXD from '../XDXD.js';
const ServicioXTecnico = () => {
    const [servicios, setServicios] = useState([{}]);
    const [user, setUser] = useState({});
    const [succes, setSucces] = useState(false);
    const [servicio, setServicio] = useState({});
    const [formValue, handleInputChange] = useForm({
        id: ''
    })
    useEffect(() => {        
        init();                          
        //getServicios();                                  
    }, []);

    const init = async () =>{
        const usuario = await JSON.parse(localStorage.getItem('user'));
        console.log(usuario.sub);
        setUser(usuario);  
        axios.get('http://bielma.com/sem-isw/servicio/'+ usuario.sub)
        .then(res => {
            console.log(user.sub);
            setServicios(res.data.servicios);
        });
    }
  
    const buscar = (e) =>{
        e.preventDefault();
        axios.get('http://bielma.com/sem-isw/orden/'+ formValue.id)        
        .then(res => {
            console.log(res);
            setServicios([res.data.orden]);
        });     
    }
    const abrir = (e) =>{        
        servicios.forEach(function(item){            
                if(item.id_orden == e.target.id){   
                    setServicio(item);                  
                    setSucces(true);                     
                }                
        });              
    }

    return (
        
        <div>                
            {
               succes && <XDXD servicio = {servicio}/>
            }
            <Header user={user} />
            <form className="form-inline" onSubmit = {buscar}>
                <input className="form-control mr-sm-2" 
                    name = "id" 
                    type="search"
                    placeholder="id"
                     aria-label="Search"
                     onChange= {handleInputChange}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Cliente</th>                            
                                <th scope="col">Falla</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                servicios.map(item => (
                                    <tr key={item.id_orden}>
                                        <td> {item.id_orden}</td>
                                        <td>{item.telefono}</td>                                        
                                        <td>{item.falla_equipo}</td>
                                        <td>{item.status}</td>
                                        <Button 
                                            id = {item.id_orden} 
                                            variant = {"info"} 
                                            onClick = {abrir}> 
                                            Detalles
                                        </Button> 
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
    );
}

export default ServicioXTecnico;