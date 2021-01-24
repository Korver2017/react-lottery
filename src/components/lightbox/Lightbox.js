import './Lightbox.css';

import { useState, useEffect } from 'react';

import { Button, Modal, Form } from 'react-bootstrap';

function Lightbox (props) {

  const [show, setShow] = useState (false);
  const [input, setInput] = useState ({ name: { first: '', last: '' }, quote: '' });
  const [employee, setEmployee] = useState ({});
  
  // const handleCloseLightbox = () => props.handleClose ();
  const handleCloseLightbox = () => setShow (false);

  const handleEditEmployee = () => {

    console.log ('props.handleEdit');

    const first = document.querySelector ('.first').value;
    const last = document.querySelector ('.last').value;
    const quote = document.querySelector ('.quote').value;
    
    props.handleEdit ({ name: { first: first, last: last }, quote: quote });

    handleCloseLightbox ();
  }

  // useEffect (() => {

  //   console.log (props);

  //   setShow (props.isShow);
    
  // }, [props.isShow]);

  useEffect (() => {

    console.log (props);

    if (props.triggerCount <= 0)
      return;

    console.log (props);

    setInput ({ name: { first: props.employee.name.first, last:  props.employee.name.last }, quote: props.employee.quote });

    setShow (true);
    
  }, [props.triggerCount])

  // useEffect (() => {

  //   if (! show)
  //     return;
    
  // }, [props.employee]);

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
            <Form.Control className="quote" defaultValue={ input.quote } as="textarea" rows={3} />
          </Form.Row>
          
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={ handleCloseLightbox }>
            Close
          </Button>
          <Button variant="primary" onClick={ handleEditEmployee }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Lightbox;
