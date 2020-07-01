import React, { useState, useEffect, useContext } from 'react';
import useForm from '../../hooks/useForm';
import axios from 'axios';
import { ServicioContext } from '../ServicioContext.js';
import InsumoServicio from '../insumos/InsumoServicio';

const EditarServicioXGerente = ({ servicio }) => {

    const [insumos, setInsumos] = useState([]);
    const [token, setToken] = useState('');
    const [nombreEmpleado, setNombreEmpleado] = useState('');
    const [nombreCliente, setNombreCliente] = useState('');
    const [emailCliente, setEmailCliente] = useState('');    
    const [total, setTotal] = useState(0);
    const [iva, setIva] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [fechaEntrega, setFechaEntrega] = useState('');
    //const [status, setStatus] = useState('En Revisión');    
    const [formValues, handleInputChange] = useForm({
        status: servicio.status,
        diagnostico: servicio.diagnostico,
        observaciones: '' ,
        costo: 0        
    });
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formValues.status == 'Pendiente por cliente'){
           cambiarStatus();
        }else if(formValues.status == 'Cerrada'){
            cerrar();
        }
        
    }
    const cambiarStatus = () =>
    {
        var diagnostico = {};
        diagnostico['id_orden'] = servicio.id_orden;
        diagnostico['diagnostico'] = formValues.diagnostico;
        diagnostico['status'] = formValues.status;
        let jsonVenta = JSON.stringify(diagnostico);
        let datos = 'datos=' + jsonVenta;
        console.log(jsonVenta);
        axios.post('http://bielma.com/sem-isw/update_servicio', datos)
            .then(res => {
                alert(res.data.message);
                console.log(res.data.message);
            }, (error) => {
                console.log(error);
            });
    }
    const cerrar = () =>{
        console.log('Concluida');
        var d = new Date();
        
        var concluido = {};
        concluido['id_orden'] = servicio.id_orden;      
        concluido['status'] = formValues.status;
        concluido['fecha_entrega'] = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();        
        concluido['total'] = total;
        let jsonVenta = JSON.stringify(concluido);
        let datos = 'datos=' + jsonVenta;
        console.log(jsonVenta);
        axios.post('http://bielma.com/sem-isw/update_servicio', datos)
            .then(res => {
                alert(res.data.message);
                console.log(res.data.message);
            }, (error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        getDetalleInsumo();
        buscarCliente();
        buscarEmpleado();   
        getFecha();     
        
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
    
    const getFecha = () => {
        var d = new Date();
        setFechaEntrega(d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate());   
                
    }
    const getDetalleInsumo = (e) =>
    {        
        var sub  = 0;
        var iva = 0;
        servicio.insumos.map((item =>
            
            axios.get('http://bielma.com/sem-isw/insumo/'+ item.id_insumo)        
            .then(res => {           
                setInsumos(
                    [...insumos,
                        {
                            idInsumo : item.id_insumo,
                            cantidad: item.cantidad,
                            precio: item.precio,
                            descripcion: res.data.insumo.descripcion,
                            nombre: res.data.insumo.nombre,
                        }
                    ]);
                    sub = sub  + (item.precio * item.cantidad);
                    iva = sub * 0.16;
                    setSubTotal(sub);
                    setIva(iva);
                    setTotal(sub + iva + formValues.costo);
            })
            

        ));
        
        
    }
    const añadirCosto = (e) =>{        
        e.preventDefault();
        console.log('Añadiendo costo...');
        setTotal(0);
        setTotal(subTotal + iva + parseInt(formValues.costo, 10));
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
                        {
                            formValues.status == 'Cerrada' &&
                            <li>
                                <label > Fecha Entrega: {fechaEntrega} </label>
                            </li>
                        }
                        
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
                        <textarea className="form-control" name="descripcion" rows="3" value={servicio.falla_equipo}></textarea>
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
                        <option name = "pendiente">Pendiente por cliente</option>
                        <option name = "cerrada">Cerrada</option>
                    </select>
                                      
                </div>
                {
                    formValues.status == 'Cerrada' && 
                    <div className = "form-group" >                        
                        <fieldset disabled>
                            <textarea className="form-control" 
                            name="diagnostico" rows="3"                                                         
                            value= {servicio.diagnostico}> </textarea>
                        </fieldset>
                        <fieldset disabled>
                            <textarea className="form-control"
                                name="observaciones" rows="3"                                                                                        
                                value = {servicio.observaciones}> 
                            </textarea>
                        </fieldset>
                        <form className = "form-group" onSubmit = {añadirCosto}>
                            <label for="costo">Costo de servicio</label>
                            <input className="form-control col-md-3" name="costo" onChange = {handleInputChange}></input>
                            <input type="submit" className="btn" name="getCliente" value="" />
                        </form>
                        
                        <legend><span class="number">5 </span>Insumos</legend>   
                       
                        <table className="table">
                           <thead className="thead-dark">
                               <tr>
                                   <th scope="col">ID</th>
                                   <th scope="col">Nombre</th>
                                   <th scope="col">Descripción</th>
                                   <th scope="col">Precio</th>
                                   <th scope="col">Cantidad</th>
                                   <th scope="col">Importe</th>
                               </tr>
                           </thead>
                           <tbody>
                           

                       {
                           
                           insumos.map((item =>
                            <tr key={item.idInsumo}>
                                <td> {item.idInsumo}</td>
                                <td> {item.nombre}</td>
                                <td> {item.descripcion}</td>
                                <td> {item.precio}</td>
                                <td> {item.cantidad}</td>
                                <td> {item.cantidad * item.precio}</td>
                            </tr>
                            ))
                                                   
                       }
                       </tbody>
                       </table>
                        <div className="row">
                            <div className="col-md-3">
                                <label> SubTotal: {subTotal} </label>    
                            </div>  
                            <div className="col-md-3">
                                <label> Iva: {iva} </label>
                            </div>  
                            <div className="col-md-3">
                                <label> Total: {total} </label>
                            </div>  
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

export default EditarServicioXGerente;