import React, { useState, useEffect } from 'react';
import Header from '../Header';
import axios from 'axios';
import useForm from '../../hooks/useForm';

const Insumos = () => {
    const [insumos, setInsumos] = useState([{}]);
    const [user, setUser] = useState({});
    const [succes, setSucces] = useState(false);
    const [formValue, handleInputChange] = useForm({
        id: ''
    })
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        getInsumos();


    }, [])

    const getInsumos = () => {
        axios.get('http://bielma.com/sem-isw/insumo')
            .then(res => {
                setInsumos(res.data.insumos)
            });
    }
    const buscar = (e) =>{
        e.preventDefault();
        axios.get('http://bielma.com/sem-isw/empleado/'+ formValue.id)
        
        .then(res => {
            console.log(res);
            setInsumos(res.data.empleado)
        });
    
    }
    return (
        <div>
            <Header user={user} />
            <form className="form-inline" onSubmit = {buscar}>
                <input className="form-control mr-sm-2" 
                    name = "id_insumo" 
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
                                <th scope="col">Descipcion</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Existencia</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                insumos.map(item => (
                                    <tr key={item.id_insumo}>
                                        <td> {item.id_insumo}</td>
                                        <td>{item.nombre}</td>
                                        <td>{item.descipcion}</td>
                                        <td>{item.precio}</td>
                                        <td>{item.existencia}</td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
    );
}

export default Insumos;