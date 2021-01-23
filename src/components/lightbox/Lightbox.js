import './Lightbox.css';

import { useState, useEffect } from 'react';

import { Button, Modal } from 'react-bootstrap';

function Lightbox (props) {

  const [show, setShow] = useState (false);

  // const handleClose = () => setShow (false);
  const handleClose = () => {
    props.handleClose (show);
  }

  useEffect (() => {

    console.log (props);

    setShow (props.isShow);
    
  }, [props.isShow]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Lightbox;
