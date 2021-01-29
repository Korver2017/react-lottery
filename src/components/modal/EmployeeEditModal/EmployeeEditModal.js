// React & Component
import { useState, useEffect } from 'react';
import './EmployeeEditModal.css';

// JavaScript Plugin
import { v4 as uuidv4 } from 'uuid';

// CSS Framework
import { Button, Modal, Form } from 'react-bootstrap';

function EmployeeEditModal ({triggerModalCount, modalType, editTarget, handleEditEmployee}) {

  const [show, setShow] = useState (false);

  // Initialize employee's data to be edited.
  const [input, setInput] = useState ({ name: { first: '', last: '' }, quote: '', id: '' });
  const handleCloseLightbox = () => setShow (false);

  // Edit employee data
  const handleEdit = () => {

    console.log ('props.handleEdit');

    const first = document.querySelector ('.first').value;
    const last = document.querySelector ('.last').value;
    const quote = document.querySelector ('.quote').value;
    const id = uuidv4 ();
    
    handleEditEmployee ({ name: { first: first, last: last }, quote: quote, id: id });

    // Close Lightbox
    handleCloseLightbox ();
  }

  useEffect (() => {

    // If parent component just initialize, return.
    if (triggerModalCount <= 0 || modalType !== 'edit')
      return;

    // Set up employee props data, then show lightbox.
    setInput ({ name: { first: editTarget.name.first, last:  editTarget.name.last }, quote: editTarget.quote });
    setShow (true);
    
  }, [triggerModalCount]);

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
          <Button variant="success" onClick={ handleEdit }>
            Update
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EmployeeEditModal;
