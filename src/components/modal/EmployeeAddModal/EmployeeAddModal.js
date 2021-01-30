// React & Component
import { useState, useEffect } from 'react';
import './EmployeeAddModal.css';

// CSS Framework
import { Button, Modal, Form } from 'react-bootstrap';

function EmployeeAddModal({showModal, handleTriggerModal}) {

  // const [show, setShow] = useState(false);
  // const handleCloseModal = () => setShow(false);

  useEffect(() => {
    console.log ('showModal', showModal);
  }, [showModal]);

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
          <Button variant="danger" >
            Delete
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
};

export default EmployeeAddModal;
