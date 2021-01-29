// React & Component
import { useState, useEffect } from 'react';
import './EmployeeEditModal.css';

// CSS Framework
import { Button, Modal, Form } from 'react-bootstrap';

function EmployeeEditModal ({triggerModalCount, modalType, editTarget, handleEditEmployee}) {

  const [show, setShow] = useState(false);

  // Initialize employee's data to be edited.
  const [input, setInput] = useState({name: {first: '', last: ''}, quote: ''});
  const handleCloseLightbox = () => setShow(false);

  // Edit employee data
  const handleEdit = () => {

    const first = document.querySelector('.first').value;
    const last = document.querySelector('.last').value;
    const quote = document.querySelector('.quote').value;

    if (!first || !last || !quote)
      return alert('Sorry, columns may not be empty.');
    
    handleEditEmployee({name: {first, last}, quote});

    // Close Lightbox
    handleCloseLightbox();
  }

  useEffect(() => {

    // If parent component just initialize, return.
    if (triggerModalCount <= 0 || modalType !== 'edit')
      return;

    // Set up employee props data, then show lightbox.
    setInput({name: {first: editTarget.name.first, last: editTarget.name.last}, quote: editTarget.quote});
    setShow (true);
    
  }, [triggerModalCount, modalType, editTarget]);

  return (
    <>
      <Modal show={show} onHide={handleCloseLightbox}>
        
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee - {input.name.first} {input.name.last}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Row className="mt-2 mb-4">

            <Form.Control className="first col-5 mr-5" defaultValue={input.name.first} type="text" placeholder="First Name" />
            <Form.Control className="last col-5" defaultValue={input.name.last} type="text" placeholder="First Name" />

          </Form.Row>

          <Form.Row>
            <Form.Control className="quote" defaultValue={input.quote} placeholder="My Declaration to Win The Prize!" as="textarea" rows={3} />
          </Form.Row>
          
        </Modal.Body>
        <Modal.Footer>

          <Button variant="warning" onClick={handleCloseLightbox}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleEdit}>
            Update
          </Button>
          
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EmployeeEditModal;
