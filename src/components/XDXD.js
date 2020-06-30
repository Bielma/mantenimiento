import { Button, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

import EditarServicio from './orden_servicio/EditarServicio.js';

const XDXD = ({servicio}) => {
    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
          
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modificar Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>            
            <EditarServicio servicio = {servicio}/>
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