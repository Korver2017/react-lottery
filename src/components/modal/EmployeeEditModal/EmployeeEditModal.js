// React & Component
import { useState, useEffect } from 'react';

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

function EmployeeEditModal ({triggerModalCount, modalType, target, handleEditEmployee}) {

  console.log ('target: ', target);

  const classes = useStyles ();

  const [open, setOpen] = useState (false);
  const theme = useTheme ();
  const fullScreen = useMediaQuery (theme.breakpoints.down ('sm'));

  // Initialize employee's data to be edited.
  const [first, setFirst] = useState ('');
  const [last, setLast] = useState ('');
  const [quote, setQuote] = useState ('');

  const handleCloseModal = () => setOpen (false);

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

  const handleInputChange = (e, column) => {

    console.log ('e: ', e.target.value);
    console.log ('column: ', column);

    if (column === 'first')
      return setFirst (e.target.value);

    if (column === 'last')
      return setLast (e.target.value);

    setQuote (e.target.value);
  }
  
  // Edit employee data
  const handleEdit = () => {

    // if (! first.value.trim () || ! last.value.trim () || ! quote.value.trim ())
    //   return alert ('Sorry, columns may not be empty.');
    
    // handleEditEmployee ({name: {first: first.value, last: last.value}, quote: quote.value});

    // Close Modal
    handleCloseModal ();
  }

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
                  error={! first}
                  className={classes.textInput}
                  id="outlined-error-helper-text"
                  label="First Name"
                  defaultValue={first}
                  helperText={! first ? "Field may not be empty." : ''}
                  variant="outlined"
                />
                <TextField
                  onChange={(e) => {handleInputChange (e, 'last')}}
                  className={classes.textInput}
                  error={! last}
                  id="outlined-error-helper-text"
                  label="Last Name"
                  defaultValue={last}
                  helperText={! last ? "Field may not be empty." : ''}
                  variant="outlined"
                />
              </div>
            </form>

            <form className={classes.form}>
              <div>
                <TextField
                  onChange={(e) => {handleInputChange (e, 'quote')}}
                  error={! quote}
                  fullWidth
                  id="outlined-multiline-static"
                  label="My Declaration"
                  multiline
                  rows={4}
                  defaultValue={quote}
                  helperText={! quote ? "Field may not be empty." : ''}
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
