import React, { useState, useEffect, useContext } from 'react';
import useForm from '../../hooks/useForm';
import axios from 'axios';
import { ServicioContext } from '../ServicioContext.js';
import InsumoServicio from '../insumos/InsumoServicio';
import jsPDF from 'jspdf';
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
        if(formValues.status == 'Cerrada'){
            cerrar();
            generarPDF();
        }else{
            cambiarStatus();
        }
        
    }
    const cambiarStatus = () =>
    {
        var diagnostico = {};
        diagnostico['id_orden'] = servicio.id_orden;        
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
        servicio.detalles.map((item =>
            
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
    const generarPDF = () => {
        var x = 630;
        var doc = new jsPDF('p', 'pt');
        doc.text(100,20, 'Servicio de mantenimiento de quipos de computo ');        
        doc.text(20,50, 'Folio: ' + servicio.id_orden);
        doc.text(300,50, 'Fecha: '+ servicio.fecha);
        doc.text(50,90, 'Cliente' );
        doc.text(20,120, 'Telefono: '+ servicio.telefono);
        doc.text(20,150, 'Nombre: ' + nombreCliente);
        doc.text(20,180, 'Email: ' +emailCliente);
        doc.text(50,220, 'Equipo' );
        doc.text(20,250, 'Equipo: ' + servicio.equipo);
        doc.text(20,280, 'Falla: ' + servicio.falla_equipo);

        doc.text(50,330, 'Técnico responsable' );
        doc.text(20,360, 'ID Empleado: ' + servicio.id_empleado);
        doc.text(20,390, 'Nombre: ' + nombreEmpleado);

        doc.text(50,440, 'Servicio' );
        doc.text(20,470, 'Status: ' + formValues.status);
        doc.text(20,500, 'Diagnostico: ' + servicio.diagnostico);
        doc.text(20,530, 'Observaciones: ' + servicio.observaciones);
        doc.text(20,560, 'Costo de servicio: ' + servicio.costo);
        
        if(insumos.length>1){
            doc.text(50, 600, 'Insumos' );
            doc.text(20, 630, 'ID' );
            doc.text(50, 630, 'Nombre' );
            doc.text(80, 630, 'Descripcion' );
            doc.text(110, 630, 'Precio' );
            doc.text(140, 630, 'Cantidad' );
            doc.text(170, 630, 'Importe' );
            for(var i = 0; i<insumos.length; i++){
                
            }
        }
        
        doc.text(20,700, 'Subtotal: ' + subTotal);
        doc.text(100,700, 'Iva: ' + iva);
        doc.text(180,700, 'Total: ' + total);

        
        doc.save(servicio.id_orden + ".pdf");
        
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
                    {
                        formValues.status == 'Con Diagnóstico' &&     
                            <>
                                <option name = "diagnóstico">Con Diagnóstico</option>
                                <option name = "pendiente">Pendiente por cliente</option>
                                <option name = "reparacion">En reparación</option>
                            </>
                    }
                    {
                         formValues.status == 'Concluida' &&     
                         <>
                            <option name = "concluida">Concluida</option>
                            <option name = "cerrada">Cerrada</option>
                         </>
                    }
                     {
                         formValues.status == 'Pendiente por cliente' &&     
                         <>                        
                            <option name = "pendiente">Pendiente por cliente</option>                         
                            <option name = "reparación">En reparación</option>
                         </>
                    }
                    {
                         formValues.status == 'En reparación' &&     
                         <>                                                    
                            <option name = "reparación">En reparación</option>
                         </>
                    }
                    {
                         formValues.status == 'Cerrada' &&                              
                          <option name = "cerrada">Cerrada</option>                                                    
                    }
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