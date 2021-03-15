// React & Component
import { useState, useEffect } from 'react';
import './EmployeeAddModal.css';

// avaScript Plugins
import { v4 as uuidv4 } from 'uuid';

// CSS Framework
// import { Button, Modal, Form } from 'react-bootstrap';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles (theme => ({
  form: {
    margin: theme.spacing (1),
  },
  textInput: {
    width: 200,
    margin: theme.spacing (1),
  },
}));

function EmployeeAddModal ({showModal, handleTriggerModal, handleAddEmployee}) {

  const classes = useStyles ();

  const [open, setOpen] = useState (false);
  const theme = useTheme ();
  const fullScreen = useMediaQuery (theme.breakpoints.down ('sm'));

  // Initialize employee's data to be edited.
  const [input, setInput] = useState ({name: {first: '', last: ''}, quote: ''});
  const handleCloseModal = () => setOpen (false);

  const handleAdd = () => {

    // const first = document.querySelector('.first').value;
    // const last = document.querySelector('.last').value;
    // const quote = document.querySelector('.quote').value;
    
    // if (!first || !last || !quote)
    //   return alert('Sorry, columns may not be empty.');

    // handleAddEmployee ({name: {first, last}, quote, id: uuidv4 ()});

    // Close modal
    handleTriggerModal ();
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={showModal}
      onClose={handleTriggerModal}
      aria-labelledby="responsive-dialog-title"
    >
      
      <DialogTitle id="responsive-dialog-title">
        {/* {input.name.first + ' ' + input.name.last} */}
      </DialogTitle>

      <DialogContent>
        <DialogContentText component={'span'}>
          
          <form noValidate autoComplete="off">
            <div>
              <TextField
                error
                className={classes.textInput}
                id="outlined-error-helper-text"
                label="First Name"
                defaultValue="QWER"
                helperText="Incorrect entry."
                variant="outlined"
              />
              <TextField
                className={classes.textInput}
                error
                id="outlined-error-helper-text"
                label="Last Name"
                defaultValue="QWER"
                helperText="Incorrect entry."
                variant="outlined"
              />
            </div>
          </form>

          <form className={classes.form}>
            <div>
              <TextField
                error
                fullWidth
                id="outlined-multiline-static"
                label="My Declaration"
                multiline
                rows={4}
                defaultValue="QWER"
                variant="outlined"
              />
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleTriggerModal} variant="outlined" color="primary">
          Disagree
        </Button>
        <Button onClick={handleTriggerModal} variant="outlined" color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )

  // return (
  //   <>
  //     <Modal show={showModal} onHide={handleTriggerModal}>

  //       <Modal.Header closeButton>
  //         <Modal.Title>Add a Employee</Modal.Title>
  //       </Modal.Header>

  //       <Modal.Body>

  //         <Form.Row className="mt-2 mb-4">

  //           <Form.Control className="first col-5 mr-5" type="text" placeholder="First Name" />
  //           <Form.Control className="last col-5" type="text" placeholder="Last Name" />

  //         </Form.Row>

  //         <Form.Row>
  //           <Form.Control className="quote" placeholder="Declaration to Win The Prize!" as="textarea" rows={3} />
  //         </Form.Row>
          
  //       </Modal.Body>
  //       <Modal.Footer>

  //         <Button variant="warning" onClick={handleTriggerModal}>
  //           Cancel
  //         </Button>
  //         <Button variant="success" onClick={handleAdd}>
  //           Create
  //         </Button>

  //       </Modal.Footer>
  //     </Modal>
  //   </>
  // )
};

export default EmployeeAddModal;
