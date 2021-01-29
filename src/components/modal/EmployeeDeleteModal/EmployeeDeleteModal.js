// React & Component
import { useState, useEffect } from 'react';
import './EmployeeDeleteModal.css';

// CSS Framework
import { Button, Modal, Form } from 'react-bootstrap';

function EmployeeDeleteModal({triggerModalCount, modalType, editTarget, handleDeleteEmployee}) {

  const [show, setShow] = useState(false);

  // Initialize employee's data to be edited.
  const [input, setInput] = useState({name: {first: '', last: ''}});
  const handleCloseLightbox = () => setShow(false);

  // Delete employee data
  const handleDelete = () => {

    handleDeleteEmployee();

    // Close Lightbox
    handleCloseLightbox();
  };

  useEffect(() => {

    // If parent component just initialize, return.
    if (triggerModalCount <= 0 || modalType !== 'delete')
      return;

    // Set up employee props data, then show lightbox.
    setInput({name: {first: editTarget.name.first, last: editTarget.name.last}});
    setShow(true);
  }, [triggerModalCount, modalType, editTarget]);

  return (
    <>
      <Modal show={show} onHide={handleCloseLightbox}>

        <Modal.Header closeButton>
          <Modal.Title>Delete Employee - {input.name.first} {input.name.last}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Row className="mt-2 mb-4">
            Are you sure to delete employee - {input.name.first} {input.name.last}?
          </Form.Row>
          
        </Modal.Body>
        <Modal.Footer>

          <Button variant="warning" onClick={handleCloseLightbox}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
};

export default EmployeeDeleteModal;
