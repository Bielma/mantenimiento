import React from 'react';
import useForm from '../../hooks/useForm';


const RegistrarClientes = () => {

    const [formValues, handleInputChange] = useForm({
        phone: '',
        nombre: '',
        email: '',
        direccion: ''
    });
    

    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
    }

    return (
        
        <form  onSubmit={handleSubmit}>
              <div className = "form-row">
                <div className="form-group col-md-3">
                    <label htmlFor="nombre"> Nombre:</label>    
                    <input type="text" name="nombre"className = "form-control" onChange = {handleInputChange}/>
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="phone">Telefono:</label>    
                    <input type="text" name="phone" className = "form-control" onChange = {handleInputChange}/>
                </div>
              
            </div>
            <div className="form-row">
                <div className="form-group col-md-3">
                <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email"name = "email" onChange = {handleInputChange}/>
                </div>
                <div className="form-group col-md-3">
                    <label htmlFor="direccion">Direccion</label>
                    <input type="text" className="form-control" name = "direccion" id="direccion" onChange = {handleInputChange}/>
                </div>
            </div>
          
            
            <input type="submit" name="submit" value="Registrar" className="btn btn-primary" />
                   
        </form>

        

    );


}

export default RegistrarClientes;