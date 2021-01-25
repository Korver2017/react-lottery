// React & Component
import { useState, useEffect } from 'react';
import './EmployeeDeleteModal.css';

// CSS Framework
import { Button, Modal, Form } from 'react-bootstrap';

function EmployeeDeleteModal (props) {

  const [show, setShow] = useState (false);

  // Initialize employee's data to be edited.
  const [input, setInput] = useState ({ name: { first: '', last: '' } });
  const handleCloseLightbox = () => setShow (false);

  // Delete employee data
  const handleDeleteEmployee = () => {
    props.handleDelete ();

    // Close Lightbox
    handleCloseLightbox ();
  };

  useEffect (() => {

    console.log (props);

    // If parent component just initialize, return.
    if (props.triggerCount <= 0 || props.modal !== 'delete')
      return;

    // Set up employee props data, then show lightbox.
    setInput ({ name: { first: props.employee.name.first, last:  props.employee.name.last } });
    setShow (true);
    
  }, [props.triggerCount]);

  return (
    <>
      <Modal show={ show } onHide={ handleCloseLightbox }>

        <Modal.Header closeButton>
          <Modal.Title>Delete Employee - { input.name.first } { input.name.last }</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Row className="mt-2 mb-4">
            Are you sure to delete employee - { input.name.first } { input.name.last }?
          </Form.Row>
          
        </Modal.Body>
        <Modal.Footer>

          <Button variant="warning" onClick={ handleCloseLightbox }>
            Cancel
          </Button>
          <Button variant="danger" onClick={ handleDeleteEmployee }>
            Delete
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
};

export default EmployeeDeleteModal;
