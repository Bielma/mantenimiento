import React from 'react';
import useForm from '../../hooks/useForm.js'


const InsumoForm = () => {
    
    const [formValues, handleInputChange] = useForm ({
        nombre: '',
        desc: '',
        precio: '',
        stock: 0
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
                <div className="form-group col-md-2">
                    <label htmlFor="precio">Precio</label>    
                    <input type="text" name="precio" className = "form-control" onChange = {handleInputChange}/>
                </div>
                <div className="form-group col-md-1">
                    <label htmlFor="stock">Existencia</label>    
                    <input type="text" name="stock" className = "form-control" onChange = {handleInputChange}/>
                </div>
               
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                <label htmlFor="desc">Descripción</label>
                    <input type="text" className="form-control" id="email"name = "desc" onChange = {handleInputChange}/>
                </div>
               
            </div>
          
            
            <input type="submit" name="submit" value="Registrar" className="btn btn-primary" />
                   
        </form>

        

    );
}

export default InsumoForm;