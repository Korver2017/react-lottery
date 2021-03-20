/**
 *
 * React & Components
 *
 */
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import { makeStyles, useTheme } from '@material-ui/core/styles';


/**
 *
 * Styles Settings
 *
 */
const useStyles = makeStyles (theme => ({
  form: {
    margin: theme.spacing (1),
  },
  textInput: {
    width: 200,
    margin: theme.spacing (1),
  },
  buttonGroup: {
    marginBottom: theme.spacing (2),
    marginRight: theme.spacing (3),
  },
  error: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  },
  success: {
    color: theme.palette.success.main,
    borderColor: theme.palette.success.main,
  }
}));


/**
 *
 * Employee Edit Modal Component
 *
 */
function EmployeeEditModal ({triggerModalCount, modalType, target, handleEditEmployee}) {

  // Apply styles.
  const classes = useStyles ();
  const theme = useTheme ();
  const fullScreen = useMediaQuery (theme.breakpoints.down ('sm'));
  
  // State of show modal.
  const [open, setOpen] = useState (false);

  // Initialize employee's data to be edited.
  const [first, setFirst] = useState ('');
  const [last, setLast] = useState ('');
  const [quote, setQuote] = useState ('');

  // State of deny submit.
  const [denyUpdate, setDenyUpdate] = useState (false);


  /**
   *
   * Check input columns to confirm submit.
   *
   */
  const checkInput = () => {
    
    // Any empty input, then deny submit.
    if (! first.trim () || ! last.trim () || ! quote.trim ())
      setDenyUpdate (true);

    else
      setDenyUpdate (false);
  }


  /**
   *
   * Handle Close Modal
   *
   */
  const handleCloseModal = () => setOpen (false);


  /**
   *
   * Initialize Modal Component
   *
   */
  useEffect (() => {

    // If parent component just initialize, return.
    if (triggerModalCount <= 0 || modalType !== 'edit')
      return;

    // Set up employee props data, then show lightbox.
    setFirst (target.name.first);
    setLast (target.name.last);
    setQuote (target.quote);
    setOpen (true);
    
  }, [triggerModalCount, modalType, target]);


  /**
   *
   * Check Input Columns
   *
   */
  useEffect (() => {

    // When columns changed, check input.
    checkInput ();
  }, [first, last, quote]);


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
  
  
  /**
   *
   * Handle Update Employee
   *
   */
  const handleUpdateEmployee = () => {

    // Before submit, check deny or not.
    if (denyUpdate)
      return;
    
    // Submit new values.
    handleEditEmployee ({name: {first, last,}, quote});

    // Close modal.
    handleCloseModal ();
  }


  /**
   *
   * JSX
   *
   */

  // Render component after getting target employee's data.
  if (Object.keys (target).length >= 1)
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        
        <DialogTitle id="responsive-dialog-title">
          {target.name.first + ' ' + target.name.last}
        </DialogTitle>

        <DialogContent>
          <DialogContentText component={'span'}>
            
            <form noValidate autoComplete="off">
              <div>
                <TextField
                  onChange={(e) => {handleInputChange (e, 'first')}}
                  error={! first.trim ()}
                  className={classes.textInput}
                  id="outlined-error-helper-text"
                  label="First Name"
                  defaultValue={first}
                  helperText={! first.trim () ? "Field may not be empty." : ''}
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => {handleInputChange (e, 'last')}}
                  className={classes.textInput}
                  error={! last.trim ()}
                  id="outlined-error-helper-text"
                  label="Last Name"
                  defaultValue={last}
                  helperText={! last.trim () ? "Field may not be empty." : ''}
                  variant="outlined"
                />
              </div>
            </form>

            <form className={classes.form}>
              <div>
                <TextField
                  onChange={(e) => {handleInputChange (e, 'quote')}}
                  error={! quote.trim ()}
                  fullWidth
                  id="outlined-multiline-static"
                  label="My Declaration"
                  multiline
                  rows={4}
                  defaultValue={quote}
                  helperText={! quote.trim () ? "Field may not be empty." : ''}
                  variant="outlined"
                />
              </div>
            </form>
          </DialogContentText>
        </DialogContent>

        <DialogActions className={classes.buttonGroup}>
          <Button className={classes.success} autoFocus onClick={handleUpdateEmployee} disabled={denyUpdate} variant="outlined">
            Update
          </Button>
          <Button className={classes.error} onClick={handleCloseModal} variant="outlined" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )

  return (
    <></>
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
