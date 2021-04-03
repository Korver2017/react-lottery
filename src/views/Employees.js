/**
 *
 * JavaScript Plugins
 *
 */
import $api from 'axios';
import rq from 'random-quotes';
import { v4 as uuidv4 } from 'uuid';


/**
 *
 * React & Material UI
 *
 */
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';


/**
 *
 * Components
 *
 */
import AddEmployeeModal from '../components/modal/AddEmployeeModal';
import EditEmployeeModal from '../components/modal/EditEmployeeModal';
import DeleteEmployeeModal from '../components/modal/DeleteEmployeeModal';


/**
 *
 * Material UI Style
 *
 */
const useStyles = makeStyles (theme => ({
  root: {
    marginTop: theme.spacing (3),
    paddingBottom: theme.spacing (3),
  },
  gutter: {
    padding: theme.spacing (2),
  },
  card: {
    height: '100%',
    position: 'relative',
    backgroundColor: '#2A3042',
    color: '#a6b0cf',
  },
  content: {
    '& p': {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    '& div': {
      marginBottom: theme.spacing (7),
    }
  },
  buttons: {
    textAlign: 'right',
    position: 'absolute',
    bottom: theme.spacing (1),
    right: theme.spacing (1),
    '& button': {
      color: '#a6b0cf',
    },
    '& button:hover': {
      color: '#fff',
    }
  },
  addEmployee: {
    position: 'fixed',
    bottom: '50px',
    right: '50px',
    fontSize: '40px',
    transition: 'transform .2s',
    color: '#a6b0cf',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.3)',
      color: '#fff',
    }
  }
}));


/**
 *
 * Employees
 *
 */
const Employees = () => {

  // Apply styles.
  const classes = useStyles ();

  // State of employees.
  const [employees, setEmployees] = useState ([]);

  // State of open AddEmployeeModal.
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState (false);

  // State of employee will be updated.
  const [addEmployee, setAddEmployee] = useState ({});
  const [editEmployee, setEditEmployee] = useState ({});
  const [deleteEmployee, setDeleteEmployee] = useState ({});


  /**
   *
   * Open & Pass Employee Data to Edit Employee Modal
   *
   */
  const handleEditModalData = (employee, i) => {
    return setEditEmployee ({...employee, order: i});
  }


  /**
   *
   * Open & Pass Employee Data to Delete Employee Modal
   *
   */
  const handleDeleteModalData = (employee, i) => {
    return setDeleteEmployee ({...employee, order: i});
  }


  /**
   *
   * Open / Hide Add Employee Modal
   *
   */
  const handleToggleModal = () => {
    return setOpenAddEmployeeModal (prevState => ! prevState);
  }
  

  /**
   *
   * Handle Add New Employee
   *
   */
  const handleAddEmployee = (addEmployee) => setAddEmployee (addEmployee);


  /**
   *
   * Update Selected Employee's Data
   *
   */
  const handleEditEmployee = (editedEmployee) => {

    const pos = editEmployee.order;

    // Update employee data.
    setEmployees (prevEmployees => {

      prevEmployees[pos].name = editedEmployee.name;
      prevEmployees[pos].quote = editedEmployee.quote;

      const updatedEmployees = [...prevEmployees];
      return updatedEmployees;
    });
  };


  /**
   *
   * Delete Selected Employee's Data
   *
   */
  const handleDeleteEmployee = () => {

    const pos = editEmployee.order;

    // Update employee data.
    setEmployees (prevEmployees => {

      prevEmployees.splice (pos, 1);

      const updatedEmployees = [...prevEmployees];
      return updatedEmployees;
    });
  };


  /**
   *
   * Initialize Employees
   *
   */
  useEffect(() => {

    // Retrieve employees' data.
    $api.get ('https://randomuser.me/api/?results=10')
      .then (res => {
        
        // Parsing data.
        const cleanSource = [...res.data.results];
        const employeeList = cleanSource.map (employee => {
          return {name: employee.name, quote: rq ().body, id: uuidv4 ()};
        });
        
        setEmployees (employeeList);
      });
  }, []);


  /**
   *
   * Add New Employee
   *
   */
  useEffect (() => {

    // Return when component just initialized.
    if (Object.keys (addEmployee).length <= 0) 
      return;

    setEmployees (prevEmployees => [...prevEmployees, addEmployee]);

  }, [addEmployee]);
  

  /**
   *
   * JSX
   *
   */
  return (
    <div className="employees">
      <Grid container className={classes.root}>
        {
          employees.map ((employee, i) => (
            <Grid key={employee.id} className={classes.gutter} item xs={3}>

              <Card className={classes.card}>

                <CardHeader title={employee.name.first + ' ' + employee.name.last} />
                <Divider variant="middle" />

                <CardContent className={classes.content}>
                  <p className={classes.subtitle}>My Declaration to <br /> Win The Prize:</p>
                  <Box>{employee.quote}</Box>
                </CardContent>

                <Box className={classes.buttons}>
                  <IconButton onClick={() => handleEditModalData (employee, i)}>
                    <CreateRoundedIcon />
                  </IconButton>

                  <IconButton onClick={() => handleDeleteModalData (employee, i)}>
                    <DeleteForeverRoundedIcon />
                  </IconButton>
                </Box>
              </Card>
              
            </Grid>
          ))
        }

        <Box onClick={handleToggleModal} className={`${classes.addEmployee} plus fas fa-plus-circle`} />
      </Grid>

      <AddEmployeeModal open={openAddEmployeeModal} handleToggleModal={handleToggleModal} handleAddEmployee={handleAddEmployee} />

      <EditEmployeeModal target={editEmployee} handleEditEmployee={handleEditEmployee} />

      <DeleteEmployeeModal target={deleteEmployee} handleDeleteEmployee={handleDeleteEmployee} />
    </div>
  );
}

export default Employees;
