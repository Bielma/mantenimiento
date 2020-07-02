import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';

import EditarServicio from './orden_servicio/EditarServicio.js';
import EditarServicioXGerente from './orden_servicio/EditarServicioXGerente.js';
import { ServicioContext } from './ServicioContext.js';
const XDXD = ({servicio, tipo, detalles}) => {
    const {succes, setSucces} = useContext(ServicioContext);    
    const handleClose = () => setSucces(false);
  //  const handleShow = () => setShow(true);
   
    return (
      <>
          
        <Modal 
          show={succes}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size = "lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Modificar Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>    
            {
              tipo == 'Tecnico' &&              
              <EditarServicio servicio = {servicio} detalles = {detalles}/>
            } 
             {
              tipo == 'Gerente' &&              
              <EditarServicioXGerente servicio = {servicio} detalles = {detalles}/>
            }        
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default XDXD;