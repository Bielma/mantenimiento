import React, { useState, useEffect } from 'react';
import Header from '../Header';
import useForm from '../../hooks/useForm';
import axios from 'axios';
import InsumoServicio from '../insumos/InsumoServicio.js'
//import buscarEmpleado from '../../hooks/buscarEmpleado.js';
const EditarServicio = ({ servicio }) => {


    const [token, setToken] = useState('');
    const [nombreEmpleado, setNombreEmpleado] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');
    //const [insumos, setInsumos] = useState([{}]);
    const [numInsumos, setNumInsumos] = useState(1);
    
    //const [status, setStatus] = useState('En Revisión');    
    const [formValues, handleInputChange] = useForm({
        status: servicio.status,
        diagnostico: ''             
    });
    

    //    const [clienteValues, buscar] = buscarEmpleado(formValues.telefono);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formValues.status == 'Con Daignóstico'){
            var diagnostico = {};
            diagnostico['id_orden'] = servicio.id_orden;
            diagnostico['diagnostico'] = formValues.diagnostico;
            diagnostico['status'] = formValues.status;
            let jsonVenta = JSON.stringify(diagnostico);
            let datos = 'datos=' + jsonVenta;
            console.log(jsonVenta);
            axios.post('http://bielma.com/sem-isw/update_diagnostico', datos)
                .then(res => {
                    alert(res.data.message);
                    console.log(res.data.message);
                }, (error) => {
                    console.log(error);
                });
        }else{
            console.log(' No es diagnostico');
        }
        
    }

    useEffect(() => {
        buscarCliente();
        buscarEmpleado();
        //  setServicio(servicio);
        // setUser(JSON.parse(localStorage.getItem('user')));
        //setToken(localStorage.getItem('token'));


    }, [])

    const buscarCliente = () => {
        axios.get('http://bielma.com/sem-isw/cliente/' + servicio.telefono)
            .then(res => {
                console.log(res);
                setNombreCliente(res.data.cliente.nombre);
                setEmailCliente(res.data.cliente.email);
            });
    }
    const buscarEmpleado = (e) => {
        axios.get('http://bielma.com/sem-isw/empleado/' + servicio.id_empleado)
            .then(res => {
                console.log(res);
                setNombreEmpleado(res.data.empleado.nombre);

            });
    }
    const addInsumo = () =>{
        setNumInsumos(numInsumos +1);   
        return(
            <InsumoServicio />
        );                
    }
    return (
        <div>
            <div className="form-style-9">
                <div>
                    <ul>
                        <li>
                            <label> Orden: {servicio.id_orden} </label>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <label > Fecha: {servicio.fecha} </label>
                        </li>
                    </ul>
                </div>


                <div className="form-group">
                    <legend><span class="number">1</span>Cliente</legend>
                    <fieldset disabled>
                        <label for="telefono">Telefono</label>
                        <input className="form-control col-md-4 " name="telefono" value={servicio.telefono}></input>
                        <label for="nombreCliente">Nombre</label>
                        <input className="form-control col-md-6" name="nombreCliente" value={nombreCliente}></input>
                        <label for="emailCliente">Email</label>
                        <input className="form-control col-md-6" name="emailCliente" value={emailCliente}></input>
                    </fieldset>

                </div>


                <div className="form-group ">
                    <legend><span class="number">2 </span>Equipo</legend>
                    <fieldset disabled>
                        <label for="equipo">Equipo</label>
                        <input className="form-control col-md-4" name="equipo" value={servicio.equipo}></input>
                        <label for="descripcion">Descripción</label>
                        <textarea className="form-control" name="descripcion" rows="3" value={servicio.observaciones}></textarea>
                    </fieldset>
                </div>

                <div className="form-group">
                    <legend><span class="number">3 </span>Tecnico Responsable</legend>
                    <fieldset disabled>
                        <label for="id_empleado">ID Empleado</label>
                        <input className="form-control col-md-3" name="id_empleado" value={servicio.id_empleado} ></input>
                        <label for="nombreEmpleado">Nombre</label>
                        <input className="form-control col-md-6" name="nombreEmpleado" value={nombreEmpleado}></input>
                    </fieldset>
                </div>
                <div className="form-group">
                    <legend><span class="number">4 </span>Servicio</legend>
                    <label for="status">Status</label>
                    <select className="form-control" name="status" value = {formValues.status} onChange={handleInputChange}>
                        <option name = "revision">En Revisión</option>
                        <option name = "diagnostico">Con Daignóstico</option>
                        <option name = "concluida">Concluida</option>
                    </select>
                    {
                        formValues.status == 'Con Daignóstico' &&                         
                        <textarea className="form-control" 
                        name="diagnostico" rows="3" 
                        placeholder = "Diagnóstico"
                        onChange = {handleInputChange}
                        value= {servicio.diagnostico}> </textarea>
                    }

                  
                </div>
                {
                    formValues.status == 'Concluida' && 
                    <div className = "form-group" >
                        <fieldset disabled>
                            <textarea className="form-control" 
                            name="diagnostico" rows="3"                                                         
                            value= {servicio.diagnostico}> </textarea>
                        </fieldset>
                        <legend><span class="number">5 </span>Insumos</legend>   
                        
                        addInsumo()
                        
                        <div className="col-md-1">
                            <input type="button" class="btn btn-success" id="add" value="+" onClick = {addInsumo}/>
                        </div>
                    </div>                        
                    
                    
                }
                
                <form className="form-group" onSubmit={handleSubmit}>                    
                    <input type="submit" className="btn btn-primary" name="enviar" value="Actualizar" />                    
                </form>
                



            </div>

        </div>
    );
}

export default EditarServicio;