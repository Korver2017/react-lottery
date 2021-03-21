// React & Component
import { useState, useEffect } from 'react';

// CSS Framework
// import { Button, Modal, Form } from 'react-bootstrap';

import Box from '@material-ui/core/Box';
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

function EmployeeDeleteModal ({target, handleDeleteEmployee}) {

  const classes = useStyles ();

  const [open, setOpen] = useState (false);
  const theme = useTheme ();
  const fullScreen = useMediaQuery (theme.breakpoints.down ('sm'));

  // Initialize employee's data to be edited.
  const [input, setInput] = useState ({name: {first: '', last: ''}, quote: ''});

  const handleCloseModal = () => setOpen (false);

  // Delete employee data
  const handleUpdateEmployee = () => {

    handleDeleteEmployee ();

    // Close Modal
    handleCloseModal ();
  };

  useEffect (() => {
    
    // Check target employee's data to show modal.
    if (Object.keys (target).length <= 0)
      return;

    // Set up employee props data, then show lightbox.
    // setInput ({name: {first: target.name.first, last: target.name.last}});
    setOpen (true);
  }, [target]);

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
