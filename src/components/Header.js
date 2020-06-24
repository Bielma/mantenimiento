import React, { Component } from 'react';
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    render() {

        if (this.props.puesto === 'Gerente') {
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
        }
        else if (this.props.puesto === 'Almacenista') {
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
        } else if (this.props.puesto === '') {
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