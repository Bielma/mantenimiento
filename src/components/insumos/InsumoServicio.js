import React, { useState, useContext } from 'react';
import useForm from '../../hooks/useForm';
import axios from 'axios';
import { ServicioContext } from '../ServicioContext.js';
import Insumos from './Insumos';

const InsumoServicio = ({idOrden}) => {

    const {insumos, setInsumos} = useContext(ServicioContext);

    const [formValues, handleInputChange] = useForm({
        idInsumo: '',
        cantidad: 0
    });


    const [insumo, setInsumo] = useState([{}]);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Get insumo');
        getInsumo();

    }

    const getInsumo = (e) =>
    {        
       
        axios.get('http://bielma.com/sem-isw/insumo/'+ formValues.idInsumo)        
        .then(res => {
            console.log(res);
            setInsumo(res.data.insumo);
        });
    }
    const addInsumo = (e) =>
    {   
        e.preventDefault();
        console.log('Añadiendo insumo al context');
        setInsumos(
            [...insumos,
                {
                    idInsumo : formValues.idInsumo,
                    cantidad: formValues.cantidad,
                    precio: insumo.precio,
                    idOrden: idOrden
                }
            ]);
    }


    return (
        <div>
            <form className="form-group" onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <input className="form-control" name="idInsumo" type="text" placeholder = "ID Insumo" onChange = {handleInputChange}/>
                        </div>
                        <form className="col-md-3" onSubmit = {addInsumo}>
                            <input className="form-control" name="cantidad" type="text" placeholder = "Cantidad" onChange = {handleInputChange}/>
                            <input type="submit" className="btn" name="setInsumo" value="" />                     
                        </form>
                        <div className="col-md-3">
                            <fieldset disabled>
                                <input className="form-control" name="importe" type="text" value = {formValues.cantidad*insumo.precio} />
                            </fieldset>                            
                        </div>
                        <div className="col-md-3">
                        <fieldset disabled>
                                <input className="form-control" name="precio" type="text" value = {insumo.precio} />
                        </fieldset>                            
                        </div>
                    </div>
                    <div class="row">
                        <div className="col-md-5">
                        <fieldset disabled>
                                <input className="form-control" name="nombre_insumo" type="text" value = {insumo.nombre} />
                            </fieldset>                            
                        </div>
                        <div className="col-md-5">
                        <fieldset disabled>
                                <input className="form-control" name="descripcion" type="text" value = {insumo.descripcion} />
                            </fieldset>                            
                        </div>
                        
                    </div>
                </div>       
                <input type="submit" className="btn" name="getInsumo" value="" />                     
            </form>
        </div>

    );
}

export default InsumoServicio;