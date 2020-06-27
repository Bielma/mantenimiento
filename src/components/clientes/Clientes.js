import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import useForm from '../../hooks/useForm';

const Clientes = () => {
    const [clientes, setClientes] = useState([{}]);
    const [user, setUser] = useState({});
    const [succes, setSucces] = useState(false);
    const [formValue, handleInputChange] = useForm({
        id: ''
    })
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        getClientes();

    }, [])

    const getClientes = () => {
        axios.get('http://bielma.com/sem-isw/cliente')
            .then(res => {
                console.log(res);
                setClientes(res.data.clientes)
            });
    }
    const buscar = (e) =>{
        e.preventDefault();


        axios.get('http://bielma.com/sem-isw/cliente/'+ formValue.id)    
        .then(res => {
            console.log(res);
            setClientes([res.data.cliente])
        });        
    
    }
    return (
        <div>
            <Header user={user} />
            <form className="form-inline" onSubmit = {buscar}>
                <input className="form-control mr-sm-2" 
                    name = "id" 
                    type="search"
                    placeholder="id"
                     aria-label="Search"
                     onChange= {handleInputChange}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">Telefono</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Email</th>
                                <th scope="col">Direccion</th>                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.map(item => (
                                    <tr key={item.telefono}>
                                        <td> {item.telefono}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.email}</td>
                                        <td>{item.direccion}</td>
                                        
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
    );
}

export default Clientes;