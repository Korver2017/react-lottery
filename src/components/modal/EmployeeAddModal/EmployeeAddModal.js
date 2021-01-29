// React & Component
import { useState, useEffect } from 'react';
import './EmployeeAddModal.css';

// CSS Framework
import { Button, Modal, Form } from 'react-bootstrap';

function EmployeeAddModal() {

  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleCloseModal}>

        <Modal.Header closeButton>
          <Modal.Title>Delete Employee - {input.name.first} {input.name.last}</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Row className="mt-2 mb-4">
            Are you sure to delete employee - {input.name.first} {input.name.last}?
          </Form.Row>
          
        </Modal.Body>
        <Modal.Footer>

          <Button variant="warning" onClick={handleCloseModal}>
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

export default EmployeeAddModal;
