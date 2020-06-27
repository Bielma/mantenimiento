import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import useForm from '../../hooks/useForm';

const Empleados = () => {
    const [empleados, setEmpleados] = useState([{}]);
    const [user, setUser] = useState({});
    const [succes, setSucces] = useState(false);
    const [formValue, handleInputChange] = useForm({
        id: ''
    })
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        getEmpleados();


    }, [])

    const getEmpleados = () => {
        axios.get('http://bielma.com/sem-isw/empleado')
            .then(res => {
                setEmpleados(res.data.empleados)
            });
    }
    const buscar = (e) =>{
        e.preventDefault();
        axios.get('http://bielma.com/sem-isw/empleado/'+ formValue.id_empleado)        
        .then(res => {
            console.log(res);
            setEmpleados([res.data.empleado])
        });
    
    }
    return (
        <div>
            <Header user={user} />
            <form className="form-inline" onSubmit = {buscar}>
                <input className="form-control mr-sm-2" 
                    name = "id_empleado" 
                    type="search"
                    placeholder="id"
                     aria-label="Search"
                     onChange= {handleInputChange}/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            

                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefono</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                empleados.map(item => (
                                    <tr key={item.id_empleado}>
                                        <td> {item.id_empleado}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.tipo}</td>
                                        <td>{item.email}</td>
                                        <td>{item.telefono}</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
    );
}

export default Empleados;