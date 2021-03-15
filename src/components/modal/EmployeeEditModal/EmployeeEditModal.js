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

let first, last, quote;

function EmployeeEditModal ({triggerModalCount, modalType, editTarget, handleEditEmployee}) {

  const classes = useStyles ();

  const [open, setOpen] = useState (false);
  const theme = useTheme ();
  const fullScreen = useMediaQuery (theme.breakpoints.down ('sm'));

  // Initialize employee's data to be edited.
  const [input, setInput] = useState ({name: {first: '', last: ''}, quote: ''});
  const handleCloseModal = () => setOpen (false);

  useEffect (() => {

    // If parent component just initialize, return.
    if (triggerModalCount <= 0 || modalType !== 'edit')
      return;

    // Set up employee props data, then show lightbox.
    setInput ({name: {first: editTarget.name.first, last: editTarget.name.last}, quote: editTarget.quote});
    setOpen (true);
    
  }, [triggerModalCount, modalType, editTarget]);
  
  // Edit employee data
  const handleEdit = () => {

    console.log ('first: ', first);
    console.log ('last: ', last);
    console.log ('quote: ', quote);

    // if (! first.value.trim () || ! last.value.trim () || ! quote.value.trim ())
    //   return alert ('Sorry, columns may not be empty.');
    
    // handleEditEmployee ({name: {first: first.value, last: last.value}, quote: quote.value});

    // Close Modal
    handleCloseModal ();
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="responsive-dialog-title"
    >
      
      <DialogTitle id="responsive-dialog-title">
        {input.name.first + ' ' + input.name.last}
      </DialogTitle>

      <DialogContent>
        <DialogContentText component={'span'}>
          
          <form noValidate autoComplete="off">
            <div>
              <TextField
                onChange={e => {
                  first = e.target.value
                }}
                error={first === ''}
                className={classes.textInput}
                id="outlined-error-helper-text"
                label="First Name"
                defaultValue={input.name.first}
                helperText="Incorrect entry."
                variant="outlined"
              />
              <TextField
                onChange={e => last = e.target.value}
                className={classes.textInput}
                error
                id="outlined-error-helper-text"
                label="Last Name"
                defaultValue={input.name.last}
                helperText="Incorrect entry."
                variant="outlined"
              />
            </div>
          </form>

          <form className={classes.form}>
            <div>
              <TextField
                onChange={e => quote = e.target.value}
                error
                fullWidth
                id="outlined-multiline-static"
                label="My Declaration"
                multiline
                rows={4}
                defaultValue={input.quote}
                variant="outlined"
              />
            </div>
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleEdit} variant="outlined" color="primary">
          Disagree
        </Button>
        <Button onClick={handleCloseModal} variant="outlined" color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )

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
