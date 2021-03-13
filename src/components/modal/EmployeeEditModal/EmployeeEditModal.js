// React & Component
import { useState, useEffect } from 'react';
// import './EmployeeEditModal.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

function EmployeeEditModal ({triggerModalCount, modalType, editTarget, handleEditEmployee}) {

  const [open, setOpen] = useState (false);
  const theme = useTheme ();
  const fullScreen = useMediaQuery (theme.breakpoints.down ('sm'));

  // Initialize employee's data to be edited.
  // const [input, setInput] = useState({name: {first: '', last: ''}, quote: ''});
  const handleCloseModal = () => setOpen (false);

  useEffect (() => {

    // If parent component just initialize, return.
    if (triggerModalCount <= 0 || modalType !== 'edit')
      return;

    // Set up employee props data, then show lightbox.
    // setInput({name: {first: editTarget.name.first, last: editTarget.name.last}, quote: editTarget.quote});
    setOpen (true);
    
  }, [triggerModalCount, modalType, editTarget]);

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCloseModal} color="primary">
          Disagree
        </Button>
        <Button onClick={handleCloseModal} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )

  // Edit employee data
  // const handleEdit = () => {

  //   const first = document.querySelector('.first').value;
  //   const last = document.querySelector('.last').value;
  //   const quote = document.querySelector('.quote').value;

  //   if (!first || !last || !quote)
  //     return alert('Sorry, columns may not be empty.');
    
  //   handleEditEmployee({name: {first, last}, quote});

  //   // Close Modal
  //   handleCloseModal();
  // }

  // return (

  //   <>
  //     <Modal show={show} onHide={handleCloseModal}>
        
  //       <Modal.Header closeButton>
  //         <Modal.Title>Edit Employee - {input.name.first} {input.name.last}</Modal.Title>
  //       </Modal.Header>

  //       <Modal.Body>

  //         <Form.Row className="mt-2 mb-4">

  //           <Form.Control className="first col-5 mr-5" defaultValue={input.name.first} type="text" placeholder="First Name" />
  //           <Form.Control className="last col-5" defaultValue={input.name.last} type="text" placeholder="Last Name" />

  //         </Form.Row>

  //         <Form.Row>
  //           <Form.Control className="quote" defaultValue={input.quote} placeholder="My Declaration to Win The Prize!" as="textarea" rows={3} />
  //         </Form.Row>
          
  //       </Modal.Body>
  //       <Modal.Footer>

  //         <Button variant="warning" onClick={handleCloseModal}>
  //           Cancel
  //         </Button>
  //         <Button variant="success" onClick={handleEdit}>
  //           Update
  //         </Button>
          
  //       </Modal.Footer>
  //     </Modal>
  //   </>
  // )
}

export default EmployeeEditModal;
