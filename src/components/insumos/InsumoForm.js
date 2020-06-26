import React, {useState, useEffect}from 'react';
import useForm from '../../hooks/useForm.js'
import axios from 'axios';
import Header from '../Header.js';

const InsumoForm = () => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [formValues, handleInputChange] = useForm ({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: 0
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        

    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        var insumo = {};
        insumo['nombre'] = formValues.nombre;
        insumo['precio'] = formValues.precio;
        insumo['existencia'] = formValues.stock;
        insumo['descripcion'] = formValues.descripcion;        
        let jsonInsumo = JSON.stringify(insumo);
        let datos = 'datos=' + jsonInsumo;
        console.log(datos);
        axios.post('http://bielma.com/sem-isw/insumo', datos, {
            headers: { Authorization: token }
        })
            .then(res => {
                if(res.data.status === 'succes')
                {
                    setMessage(res.data.message);
                }
                console.log(res.data.message);                
            }, (error) => {
                console.log(error);
            });


    }

    return (
        <div>
            <Header user = {user}/>
            <form className = "form-style-9" onSubmit={handleSubmit}>
              <div className = "form-row">
                <div className="form-group col-md-3">
                    <label htmlFor="nombre"> Nombre:</label>    
                    <input type="text" name="nombre"className = "form-control" onChange = {handleInputChange}/>
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="precio">Precio</label>    
                    <input type="text" name="precio" className = "form-control" onChange = {handleInputChange}/>
                </div>
                <div className="form-group col-md-2">
                    <label htmlFor="stock">Existencia</label>    
                    <input type="text" name="stock" className = "form-control" onChange = {handleInputChange}/>
                </div>
               
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="descripcion">Descripción</label>
                    <input type="text" className="form-control" id="email"name = "descripcion" onChange = {handleInputChange}/>
                </div>
               
            </div>
          
            
            <input type="submit" name="submit" value="Registrar" className="btn btn-primary" />
                   
        </form>

        </div>
        
        

    );
}

export default InsumoForm;