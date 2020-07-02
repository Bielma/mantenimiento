import React, { useState, useEffect, useContext} from 'react';
import Header from '../Header';
import axios from 'axios';
import useForm from '../../hooks/useForm';
import XDXD from '../XDXD.js';
import { Button } from 'react-bootstrap';
import { ServicioContext } from '../ServicioContext.js';
const Servicios = () => {
    const {succes, setSucces} = useContext(ServicioContext);
    const [servicios, setServicios] = useState([{}]);
    const [user, setUser] = useState({});      
    const [servicio, setServicio] = useState({});
    const [detalles, setdetalles] = useState([])
    const [formValue, handleInputChange] = useForm({
        id: ''
    })
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        getServicios();
    }, [])

    const getServicios = () => {
        axios.get('http://bielma.com/sem-isw/orden')
            .then(res => {
                setServicios(res.data.ordenes);
                //setServicios(res.data.servicios.filter(item=>  item.status=== 'En reparación' || item.status=== 'En Revisión'));
                //setdetalles(res.data.detalles);
            });
    }
    const buscar = (e) =>{
        e.preventDefault();
        axios.get('http://bielma.com/sem-isw/orden/'+ formValue.id)        
        .then(res => {
            console.log(res);
            setServicios(res.data.orden);
        });    
    }
    const abrir = (e) =>{        
        servicios.forEach(function(item){            
            if(item.id_orden == e.target.id){   
                setServicio(item);           
                axios.get('http://bielma.com/sem-isw/insumo_orden')
                .then(res => {                    
                    //setServicios(res.data.servicios.filter(item=>  item.status=== 'En reparación' || item.status=== 'En Revisión'));
                    setdetalles(res.data.detalles.filter(detalle => detalle.id_orden === item.id_orden));
                    setSucces(true);            
                });
                
            }                
        });              
    }

    return (
        <div>
            {
               succes && <XDXD servicio = {servicio} tipo = {user.puesto} mostrar = {true} detalles = {detalles}/>
            }
            <Header user={user} />
            <form className="form-inline" onSubmit = {buscar}>
                <input className="form-control mr-sm-2" 
                    name = "id_insumo" 
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
                                <th scope="col">Tecnico</th>
                                <th scope="col">Observaciones</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                servicios.map(item => (
                                    <tr key={item.id_orden}>
                                        <td> {item.id_orden}</td>
                                        <td>{item.telefono}</td>
                                        <td>{item.id_empleado}</td>
                                        <td>{item.observaciones}</td>
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

export default Servicios;