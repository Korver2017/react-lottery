/**
 *
 * React & Components
 *
 */
import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
  warning: {
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
  }
}));


/**
 *
 * Employee Delete Modal Component
 *
 */
function EmployeeDeleteModal ({target, handleDeleteEmployee}) {

  // Apply styles.
  const classes = useStyles ();
  const theme = useTheme ();
  const fullScreen = useMediaQuery (theme.breakpoints.down ('sm'));
  
  // State of open modal.
  const [open, setOpen] = useState (false);


  /**
   *
   * Handle Close Modal
   *
   */
  const handleCloseModal = () => setOpen (false);

  
  /**
   *
   * Handle Update Employee
   *
   */
  const handleUpdateEmployee = () => {

    // Submit to delete employee.
    handleDeleteEmployee ();

    // Close modal.
    handleCloseModal ();
  };


  /**
   *
   * Initialize Modal Component
   *
   */
  useEffect (() => {
    
    // Check target employee's data to show modal.
    if (Object.keys (target).length <= 0)
      return;

    // Open modal.
    setOpen (true);
  }, [target]);

  
  /**
   *
   * JSX
   *
   */

  // Render component after getting target employee's data.
  if (Object.keys (target).length <= 0)
    return <></>

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="responsive-dialog-title"
    >
      
      <DialogTitle className={classes.error} id="responsive-dialog-title">
        <Box component={'span'}>Delete</Box> {target.name.first + ' ' + target.name.last}?
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete {target.name.first + ' ' + target.name.last}'s employee data?
        </DialogContentText>
      </DialogContent>

      <DialogActions className={classes.buttonGroup}>
        <Button className={classes.error} autoFocus onClick={handleUpdateEmployee} variant="outlined">
          Delete
        </Button>
        <Button color="default" onClick={handleCloseModal} variant="outlined" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default EmployeeDeleteModal;
