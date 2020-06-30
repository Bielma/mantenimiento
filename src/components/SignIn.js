import React from 'react';
import useForm from '../hooks/useForm.js'
import Header from './Header.js';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';  
import { useState } from 'react';
const SignIn = () => {

    const [formValues, handleInputChange] = useForm({
        id: '',
        pass: ''
    });

    const [message, setMessage] = useState('');
    const [logeado, setlogeado] = useState(false);
    const [puesto, setPuesto] = useState('');
    const [submitted , setSubmitted ] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        var user = {};

            user['id'] = formValues.id;
            user['pass'] = formValues.pass;
            let jsonUser = JSON.stringify(user);
            let datos = 'datos=' + jsonUser;
            

            axios.post('http://bielma.com/sem-isw/login', datos)
                .then(res => {

                    if (res.data.status === 'succes') {                        
                        localStorage.setItem('user', JSON.stringify(res.data.user));                      
                        localStorage.setItem('token', res.data.token);  
                        console.log("Succes login");
                        setPuesto(res.data.user.puesto);
                        setlogeado(true);
                        
                    } else {
                        setMessage(res.data.message); 
                    }
                    //console.log(res.status);
                    console.log(res.data);

                });
              
    }

    if(logeado){
        switch(puesto){
            case 'Tecnico':
                return (
                    <Redirect from="/login" to="/servicios2" />
                );
                break;
            case 'Gerente' : 
                return (
                    <Redirect from="/login" to="/servicios" />
                );
                    
            break;
            case 'Almacen':
                return (
                    <Redirect from="/signin" to="/mov_almacen" />
                );
                break;
            default:
                console.log("khe?");
            break;
        }
        
    }else{
        return (
        
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                        <form className="login100-form validate-form" onSubmit = {handleSubmit}>
                            <span className="login100-form-title p-b-33">
                                Account Login
                        </span>
    
                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="id" placeholder="Email" onChange={handleInputChange}/>
                                <span className="focus-input100-1"></span>
                                <span className="focus-input100-2"></span>
                            </div>
    
                            <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" name="pass" placeholder="Password" onChange = {handleInputChange}/>
                                <span className="focus-input100-1"></span>
                                <span className="focus-input100-2"></span>
                            </div>
                            {submitted  && !logeado &&
                                    <div className="help-block">{message}</div>
                            }
                            <div className="container-login100-form-btn m-t-20">
                                <button className="login100-form-btn">
                                    Sign in
                            </button>
                            </div>
    
                            <div className="text-center p-t-45 p-b-4">
                                <span className="txt1">
                                    Forgot
                            </span>
    
                                <a href="#" className="txt2 hov1">
                                    Username / Password?
                            </a>
                            </div>
    
                            <div className="text-center">
                                <span className="txt1">
                                    Create an account?
                            </span>
    
                                <a href="#" className="txt2 hov1">
                                    Sign up
                            </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    
    
        );
    }
    
}

export default SignIn;