// React & Component
import { useState, useEffect } from 'react';
import './EmployeeEditModal.css';

// JavaScript Plugin
import { v4 as uuidv4 } from 'uuid';

// CSS Framework
import { Button, Modal, Form } from 'react-bootstrap';

function EmployeeEditModal (props) {

  const [show, setShow] = useState (false);

  // Initialize employee's data to be edited.
  const [input, setInput] = useState ({ name: { first: '', last: '' }, quote: '', id: '' });
  const handleCloseLightbox = () => setShow (false);

  // Edit employee data
  const handleEditEmployee = () => {

    console.log ('props.handleEdit');

    const first = document.querySelector ('.first').value;
    const last = document.querySelector ('.last').value;
    const quote = document.querySelector ('.quote').value;
    const id = uuidv4 ();
    
    props.handleEdit ({ name: { first: first, last: last }, quote: quote, id: id });

    // Close Lightbox
    handleCloseLightbox ();
  }

  useEffect (() => {

    console.log (props);

    // If parent component just initialize, return.
    if (props.triggerCount <= 0 || props.modal !== 'edit')
      return;

    // Set up employee props data, then show lightbox.
    setInput ({ name: { first: props.employee.name.first, last:  props.employee.name.last }, quote: props.employee.quote });
    setShow (true);
    
  }, [props.triggerCount]);

  return (
    <>
      <Modal show={ show } onHide={ handleCloseLightbox }>
        
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee - { input.name.first } { input.name.last }</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Row className="mt-2 mb-4">

            <Form.Control className="first col-5 mr-5" defaultValue={ input.name.first } type="text" placeholder="First Name" />
            <Form.Control className="last col-5" defaultValue={ input.name.last } type="text" placeholder="First Name" />

          </Form.Row>

          <Form.Row>
            <Form.Control className="quote" defaultValue={ input.quote } placeholder="My Declaration to Win The Prize!" as="textarea" rows={3} />
          </Form.Row>
          
        </Modal.Body>
        <Modal.Footer>

          <Button variant="warning" onClick={ handleCloseLightbox }>
            Cancel
          </Button>
          <Button variant="success" onClick={ handleEditEmployee }>
            Update
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EmployeeEditModal;
