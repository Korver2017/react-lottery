// React & Component
import { useState, useEffect } from 'react';

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

function EmployeeAddModal ({showModal, handleToggleModal, handleAddEmployee}) {

  const classes = useStyles ();

  // const [open, setOpen] = useState (false);
  const theme = useTheme ();
  const fullScreen = useMediaQuery (theme.breakpoints.down ('sm'));

  // Initialize employee's data to be added.
  const [first, setFirst] = useState ('');
  const [last, setLast] = useState ('');
  const [quote, setQuote] = useState ('');

  const [watchInput, setWatchInput] = useState (false);

  // State of deny submit.
  const [denyUpdate, setDenyUpdate] = useState (true);


  /**
   *
   * Check input columns to confirm submit
   *
   */
  const checkInput = () => {
    
    // Any empty input, deny submit.
    if (! first.trim () || ! last.trim () || ! quote.trim ())
      return setDenyUpdate (true);

    else
      return setDenyUpdate (false);
  }


  /**
   *
   * Check Input Columns
   *
   */
  useEffect (() => {

    // When columns changed, check input.
    checkInput ();
  }, [first, last, quote]);

  const handleUpdateEmployee = () => {

    if (denyUpdate)
      return setWatchInput (true);

    handleAddEmployee ({name: {first, last}, quote, id: uuidv4 ()});

    handleCloseModal ();
    
    // setWatchInput (false);
    // setDenyUpdate (true);
    // // // Close modal
    // handleToggleModal ();
  }


  const handleCloseModal = () => {

    setWatchInput (false);
    setDenyUpdate (true);
    setFirst ('');
    setLast ('');
    setQuote ('');

    handleToggleModal ();
  }


  /**
   *
   * Handle Input Change
   *
   */
  const handleInputChange = (e, column) => {

    // Watching column, give it a new value.
    switch (column) {

      case 'first':
        return setFirst (e.target.value);

      case 'last':
        return setLast (e.target.value);

      case 'quote':
        return setQuote (e.target.value);
    }
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={showModal}
      onClose={handleCloseModal}
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
                onChange={(e) => {handleInputChange (e, 'first')}}
                error={watchInput && ! first.trim ()}
                className={classes.textInput}
                id="outlined-error-helper-text"
                label="First Name"
                helperText={watchInput && ! first.trim () ? "Field may not be empty." : ''}
                variant="outlined"
              />
              <TextField
                onChange={(e) => {handleInputChange (e, 'last')}}
                className={classes.textInput}
                error={watchInput && ! last.trim ()}
                id="outlined-error-helper-text"
                label="Last Name"
                helperText={watchInput && ! last.trim () ? "Field may not be empty." : ''}
                variant="outlined"
              />
            </div>
          </form>

          <form className={classes.form}>
            <div>
              <TextField
                onChange={(e) => {handleInputChange (e, 'quote')}}
                error={watchInput && ! quote.trim ()}
                fullWidth
                id="outlined-multiline-static"
                label="My Declaration"
                multiline
                rows={4}
                helperText={watchInput && ! quote.trim () ? "Field may not be empty." : ''}
                variant="outlined"
              />
            </div>
          </form>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleUpdateEmployee} variant="outlined" color="primary">
          Add
        </Button>

        <Button onClick={handleCloseModal} variant="outlined" color="primary">
          Cancel
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
