import React, { useState, useEffect } from 'react';


const Empleados = () => {
    const [empleadoState, setEmpleadoState] = useState([{
        id: 1,
        name: 'Antonio',
        email: '@fas',
        phone: '123',
        tipo: 'Gerente'
    }])
    /*
    {
            name: '',
            email: '',
            phone: '',
            pass: '',
            tipo: ''
        }
    */
    /* useEffect(() => {
         
         //Buscar empleados
       
         return () => {
             console.log("bye");
         }
     }, [])*/

    const listar = () => {
        console.log("Listando");
        console.log(empleadoState);
        empleadoState.map(item => (
            <tr key={item.id}>
                <th scope="row">item.id</th>
                <td>item.nombre</td>
                <td>item.tipo</td>
                <td>item.email</td>
                <td>item.telefono</td>
            </tr>
        ))
    }
    return (
        <div>
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
                        empleadoState.map(item => (
                            <tr key={item.id}>
                                <td> {item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.tipo}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
        </div>
    );
}

export default Empleados;