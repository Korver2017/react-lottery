// React & Component
import { useState, useEffect } from 'react';
import './EmployeeAddModal.css';

// avaScript Plugins
import { v4 as uuidv4 } from 'uuid';

// CSS Framework
import { Button, Modal, Form } from 'react-bootstrap';

function EmployeeAddModal({showModal, handleTriggerModal, handleAddEmployee}) {

  const handleAdd = () => {

    const first = document.querySelector('.first').value;
    const last = document.querySelector('.last').value;
    const quote = document.querySelector('.quote').value;
    
    if (!first || !last || !quote)
      return alert('Sorry, columns may not be empty.');

    handleAddEmployee({name: {first, last}, quote, id: uuidv4()});

    // Close modal
    handleTriggerModal();
  }

  return (
    <>
      <Modal show={showModal} onHide={handleTriggerModal}>

        <Modal.Header closeButton>
          <Modal.Title>Add a Employee</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Row className="mt-2 mb-4">

            <Form.Control className="first col-5 mr-5" type="text" placeholder="First Name" />
            <Form.Control className="last col-5" type="text" placeholder="Last Name" />

          </Form.Row>

          <Form.Row>
            <Form.Control className="quote" placeholder="Declaration to Win The Prize!" as="textarea" rows={3} />
          </Form.Row>
          
        </Modal.Body>
        <Modal.Footer>

          <Button variant="warning" onClick={handleTriggerModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Create
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
};

export default EmployeeAddModal;
