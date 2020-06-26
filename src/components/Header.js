import React, { Component } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    
    render() {
        const currentUser = this.props.user;
        var tipoEmpleado = currentUser.puesto;

        if (tipoEmpleado === 'Gerente') {
            return (
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand >Orden de Servicio</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            
                            <NavDropdown title="Servios" id="basic-nav-dropdown">
                                <NavDropdown.Item >
                                    <NavLink to="/orden_servicio">Nuevo Servicio</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item >
                                    <NavLink to="/servicios">Servicios</NavLink>
                                </NavDropdown.Item>                        
                            </NavDropdown>
                            <NavDropdown title="Insumos" id="basic-nav-dropdown">
                                <NavDropdown.Item >
                                    <NavLink to="/new_insumo">Nuevo Insumo</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item >
                                    <NavLink to="/insumos">Insumos</NavLink>
                                </NavDropdown.Item>                           
                            </NavDropdown>
                            <NavDropdown title="Empleados" id="basic-nav-dropdown">
                                <NavDropdown.Item >
                                    <NavLink to="/new_empleado">Nuevo Empleado</NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item >
                                    <NavLink to="/empleados">Ver emleados</NavLink>  
                                </NavDropdown.Item>                                                            
                            </NavDropdown>
                            <NavDropdown title="Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item >aber</NavDropdown.Item>                              
                                <NavDropdown.Divider />
                                <NavDropdown.Item >
                                    <NavLink to="/salir">Salir</NavLink>  
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Usuario: <a href="#login">{currentUser.nombre}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
        else if (tipoEmpleado === 'Almacenista') {
            return (
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item >Action</NavDropdown.Item>
                                <NavDropdown.Item >Another action</NavDropdown.Item>
                                <NavDropdown.Item >Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >Salir</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Usuario: <a href="#login">Bielma</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            );
        } else if (tipoEmpleado === '') {
            return (
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Menu" id="basic-nav-dropdown">
                                <NavDropdown.Item >Action</NavDropdown.Item>
                                <NavDropdown.Item >Another action</NavDropdown.Item>
                                <NavDropdown.Item >Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >Salir</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Usuario: <a href="#login">Bielma</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>
            );
        } else {
            return (
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home"><strong>Tienda</strong>khe?</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />                    
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link >
                            <NavLink className="mr-auto" to="/login">SignIn</NavLink>
                        </Nav.Link>
                        <Nav.Link >
                            <NavLink to="/login">Registrarse</NavLink>
                        </Nav.Link>    
                    </Navbar.Collapse>
                    
                </Navbar>
            );
        }



    }
}

export default Header;