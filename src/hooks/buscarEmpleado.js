import React, {useState} from 'react';
import axiox from 'axios';

const buscarEmpleado = (phone) => {

   const [empleado, setEmpleado] = useState({

   });

    const buscar = () =>
    {
        axiox.get('http://bielma.com/sem-isw/empleado/')    
        
        .then(res => {
            console.log(res);
            setEmpleado(res.data.empleado)
        });
    
    }

    return[empleado, buscar];

}

export default buscarEmpleado;