import React, {useState, useEffect} from 'react';
import useForm from '../../hooks/useForm';
import Header from '../Header';
import axios from 'axios';


const RegistrarClientes = () => {

    const [formValues, handleInputChange] = useForm({
        phone: '',
        nombre: '',
        email: '',
        direccion: ''
    });
    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        setToken(localStorage.getItem('token'));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let jsonCliente = JSON.stringify(formValues);
        let datos = 'datos=' + jsonCliente;
        console.log(datos);
        axios.post('http://bielma.com/sem-isw/cliente', datos)
            .then(res => {              
                setMessage(res.data.message);              
                console.log(res.data.message);                
            }, (error) => {
                console.log(error);
            });


    }

    return (
        <div>
            <Header user = {user}/>
    <form  className  = "form-style-9" onSubmit={handleSubmit}>
              <div className = "form-row">
                <div className="form-group col-md-5">
                    <label htmlFor="nombre"> Nombre:</label>    
                    <input type="text" name="nombre"className = "form-control" onChange = {handleInputChange}/>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="phone">Telefono:</label>    
                    <input type="text" name="phone" className = "form-control" onChange = {handleInputChange}/>
                </div>
              
            </div>
            <div className="form-row">
                <div className="form-group col-md-5">
                <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email"name = "email" onChange = {handleInputChange}/>
                </div>
                <div className="form-group col-md-5">
                    <label htmlFor="direccion">Direccion</label>
                    <input type="text" className="form-control" name = "direccion" id="direccion" onChange = {handleInputChange}/>
                </div>
            </div>
          
            { 
                message !== '' &&
                <div class="alert alert-primary" role="alert">
                    {message}
                </div>
            }
            <input type="submit" name="submit" value="Registrar" className="btn btn-primary" />
                   
        </form>

        

        </div>
        
    );


}

export default RegistrarClientes;