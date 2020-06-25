import React, { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm.js'
import Header from '../Header.js';
import axios from 'axios';


const EmpleadoForm = () => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');
    const [formValues, handleInputChange] = useForm({
        nombre: '',
        email: '',
        phone: '',
        pass: '',
        tipo: ''
    });
    const [message, setMessage] = useState('');
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        setToken(localStorage.getItem('token'));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        var empleado = {};
        empleado['nombre'] = formValues.nombre;
        empleado['email'] = formValues.email;
        empleado['telefono'] = formValues.phone;
        empleado['tipo'] = formValues.tipo;
        empleado['contraseña'] = formValues.pass;
        let jsonEmpleado = JSON.stringify(empleado);
        let datos = 'datos=' + jsonEmpleado;
        console.log(datos);
        axios.post('http://bielma.com/sem-isw/empleado', datos, {
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
            <Header user={user} />

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="nombre"> Nombre:</label>
                        <input type="text" name="nombre" className="form-control" onChange={handleInputChange} />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="phone">Telefono:</label>
                        <input type="text" name="phone" className="form-control" onChange={handleInputChange} />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="tipo">Tipo Empleado:</label>
                        <input type="text" name="tipo" className="form-control" onChange={handleInputChange} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={handleInputChange} />
                    </div>
                    <div className="form-group col-md-3">
                        <label htmlFor="pass">Password</label>
                        <input type="password" className="form-control" name="pass" id="pass" onChange={handleInputChange} />
                    </div>
                  
                    <div className="help-block">{message}</div>
                    
                </div>


                <input type="submit" name="submit" value="Registrar" className="btn btn-primary" />

            </form>



        </div>

    );
}

export default EmpleadoForm;