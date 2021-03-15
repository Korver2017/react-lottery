// React & Component
import { useState, useEffect } from 'react';

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

function EmployeeDeleteModal ({triggerModalCount, modalType, editTarget, handleDeleteEmployee}) {

  const classes = useStyles ();

  const [open, setOpen] = useState (false);
  const theme = useTheme ();
  const fullScreen = useMediaQuery (theme.breakpoints.down ('sm'));

  // Initialize employee's data to be edited.
  const [input, setInput] = useState ({name: {first: '', last: ''}, quote: ''});
  const handleCloseModal = () => setOpen (false);

  // Delete employee data
  const handleDelete = () => {

    handleDeleteEmployee ();

    // Close Modal
    handleCloseModal ();
  };

  useEffect (() => {

    // If parent component just initialize, return.
    if (triggerModalCount <= 0 || modalType !== 'delete')
      return;

    // Set up employee props data, then show lightbox.
    setInput ({name: {first: editTarget.name.first, last: editTarget.name.last}});
    setOpen (true);
  }, [triggerModalCount, modalType, editTarget]);

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
                error
                className={classes.textInput}
                id="outlined-error-helper-text"
                label="First Name"
                defaultValue={input.name.first}
                helperText="Incorrect entry."
                variant="outlined"
              />
              <TextField
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
        <Button autoFocus onClick={handleDelete} variant="outlined" color="primary">
          Disagree
        </Button>
        <Button onClick={handleDelete} variant="outlined" color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default EmployeeDeleteModal;
