import React, { useState, useEffect } from 'react';
import Header from '../Header';
import useForm from '../../hooks/useForm';
import axios from 'axios';
//import buscarEmpleado from '../../hooks/buscarEmpleado.js';
const NuevaOrdenServicio = () => {

    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [orden, setOrden] = useState(0);
    const [fecha, setFecha] = useState('');
    const [nombreEmpleado, setNombreEmpleado] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    const [status, setStatus] = useState('En Revisión');
    const [formValues, handleInputChange] = useForm({
        telefono: '',
        id_empleado: '',
        descripcion: '',
        equipo: ''
    });
//    const [clienteValues, buscar] = buscarEmpleado(formValues.telefono);
    const handleSubmit = (e) => {        
        e.preventDefault();
        var orden = {};
        console.log("ENVIANDO..");
        orden['fecha'] = fecha;
        orden['telefono'] = formValues.telefono;
        orden["equipo"] = formValues.equipo;
        orden['observaciones'] = formValues.descripcion;
        orden['id_empleado'] = formValues.id_empleado;
        orden['status'] = status;
        let jsonVenta = JSON.stringify(orden);
        let datos = 'datos=' + jsonVenta;
        console.log(jsonVenta);
        axios.post('http://bielma.com/sem-isw/orden', datos)
            .then(res => {
                alert(res.data.message);
                console.log(res.data.message);                
            }, (error) => {
                console.log(error);
            });
    }
    const getFecha = () => {
        var d = new Date();
        setFecha(d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate());
        axios.get('http://bielma.com/sem-isw/num_orden')    
        .then(res => {           
            
            setOrden((res.data.ordenes)+1);
        });

    }
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        setToken(localStorage.getItem('token'));
        getFecha();
    }, [])
    const buscarCliente = (e) => {
        e.preventDefault();
        axios.get('http://bielma.com/sem-isw/cliente/'+ formValues.telefono)    
        .then(res => {
            console.log(res);
            setNombreCliente(res.data.cliente.nombre);
            setEmailCliente(res.data.cliente.email);
        });
    }
    const buscarEmpleado = (e) => {
        e.preventDefault();
        axios.get('http://bielma.com/sem-isw/empleado/'+ formValues.id_empleado)    
        .then(res => {
            console.log(res);
            setNombreEmpleado(res.data.empleado.nombre);
            
        });
    }
    return (
        <div>
            <Header user={user} />
            <div className="form-style-9">
                <div>
                    <ul>
                        <li>
                            <label> Orden: {orden} </label>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <label > Fecha: {fecha} </label>
                        </li>
                    </ul>
                </div>


                <form className="form-group" onSubmit={buscarCliente}>
                    <legend><span class="number">1</span>Cliente</legend>
                    <label for="telefono">Telefono</label>
                    <input className="form-control col-md-4 " name="telefono" onChange={handleInputChange} ></input>
                    <fieldset disabled>
                        <label for="nombreCliente">Nombre</label>
                        <input className="form-control col-md-6" name="nombreCliente" value={nombreCliente}></input>
                        <label for="emailCliente">Email</label>
                        <input className="form-control col-md-6" name="emailCliente" value={emailCliente}></input>
                    </fieldset>
                    <input type="submit" className="btn" name="getCliente" value="" />
                </form>


                <form className="form-group" >
                    <div className="form-group ">
                        <legend><span class="number">2 </span>Equipo</legend>
                        <label for="equipo">Equipo</label>
                        <input className="form-control col-md-4" name="equipo" onChange={handleInputChange}></input>
                        <label for="descripcion">Descripción</label>
                        <textarea className="form-control" name="descripcion" rows="3" onChange={handleInputChange}></textarea>
                    </div>

                    <form className="form-group" onSubmit={buscarEmpleado}>
                        <legend><span class="number">3 </span>Tecnico Responsable</legend>
                        <label for="id_empleado">ID Empleado</label>
                        <input className="form-control col-md-3" name="id_empleado" onChange={handleInputChange} ></input>
                        <fieldset disabled>
                            <label for="nombreEmpleado">Nombre</label>
                            <input className="form-control col-md-6" name="nombreEmpleado" value={nombreEmpleado}></input>
                        </fieldset>
                        <input type="submit" className="btn" name="getTecnico" value="" />
                    </form>
                    <div className="form-group ">
                        <legend><span class="number">4 </span>Servicio</legend>
                        <fieldset disabled>
                            <label for="status">Status</label>
                            <input className="form-control col-md-6" name="status" value={status}></input>
                        </fieldset>
                    </div>
                    <form className="form-group" onSubmit = {handleSubmit}>
                        <input type="submit" className="btn btn-primary" name="enviar" value="Enviar" />
                    </form>

                </form>

            </div>

        </div>
    );
}

export default NuevaOrdenServicio;