import React, { useState } from 'react';
import useForm from '../../hooks/useForm';
import axios from 'axios';

const InsumoServicio = () => {

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

    const getInsumo = () =>
    {        
        axios.get('http://bielma.com/sem-isw/insumo/'+ formValues.idInsumo)
        
        .then(res => {
            console.log(res);
            setInsumo(res.data.insumo);
        });
    }


    return (
        <div>
            <form className="form-group" onSubmit={handleSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <input className="form-control" name="idInsumo" type="text" placeholder = "ID Insumo" onChange = {handleInputChange}/>
                        </div>
                        <div className="col-md-3">
                            <input className="form-control" name="cantidad" type="text" placeholder = "Cantidad" onChange = {handleInputChange}/>
                        </div>
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