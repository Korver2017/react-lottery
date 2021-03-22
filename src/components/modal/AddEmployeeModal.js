/**
 *
 * JavaScript Plugin
 *
 */
import { v4 as uuidv4 } from 'uuid';


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
 * Employee Add Modal
 *
 */
function EmployeeAddModal ({open, handleToggleModal, handleAddEmployee}) {

  // Apply styles.
  const classes = useStyles ();
  const theme = useTheme ();
  const fullScreen = useMediaQuery (theme.breakpoints.down ('sm'));
  
  // State of open modal.
  // const [open, setOpen] = useState (false);

  // Initialize employee's data to be added.
  const [first, setFirst] = useState ('');
  const [last, setLast] = useState ('');
  const [quote, setQuote] = useState ('');

  // State of watching input columns.
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


  /**
   *
   * Handle Update Employee
   *
   */
  const handleUpdateEmployee = () => {

    // Trigger watching input after deny submit.
    if (denyUpdate)
      return setWatchInput (true);

    // Add new employee.
    handleAddEmployee ({name: {first, last}, quote, id: uuidv4 ()});

    // Close modal.
    handleCloseModal ();
  }


  /**
   *
   * Reset Data When Closing Modal
   *
   */
  const handleCloseModal = () => {

    // Reset inputs.
    setFirst ('');
    setLast ('');
    setQuote ('');

    // Reset watcher & deny state.
    setWatchInput (false);
    setDenyUpdate (true);

    // Close modal.
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


  /**
   *
   * JSX
   *
   */
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="responsive-dialog-title"
    >
      
      <DialogTitle id="responsive-dialog-title">
        Add New Employee
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

      <DialogActions className={classes.buttonGroup}>
        <Button className={classes.success} onClick={handleUpdateEmployee} variant="outlined" color="primary">
          Add
        </Button>

        <Button className={classes.error} onClick={handleCloseModal} variant="outlined" color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default EmployeeAddModal;
