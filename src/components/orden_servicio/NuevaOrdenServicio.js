import React, { useState, useEffect } from 'react';
import Header from '../Header';

const NuevaOrdenServicio = () => {

    const [user, setUser] = useState({

    });
    const [token, setToken] = useState('');


    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')));
        setToken(localStorage.getItem('token'));
    }, [])

    return (
        <div>
            <Header user = {user}/>
            <h1>Orden de Servicio   </h1>
        </div>
    );
}

export default NuevaOrdenServicio;