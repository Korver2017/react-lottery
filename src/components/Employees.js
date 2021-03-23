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
import AddEmployeeModal from './modal/AddEmployeeModal';
import EditEmployeeModal from './modal/EditEmployeeModal';
import DeleteEmployeeModal from './modal/DeleteEmployeeModal';


/**
 *
 * Styles Settings
 *
 */
const useStyles = makeStyles (theme => ({
  root: {
    padding: theme.spacing (2),
  },
  card: {
    height: '100%'
  },
  subtitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icons: {
    textAlign: 'right',
  },
  addEmployee: {
    position: 'fixed',
    bottom: '50px',
    right: '50px',
    fontSize: '40px',
    transition: 'transform .2s',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.3)',
      color: theme.palette.primary.main,
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

    setEmployees ([...employees, addEmployee]);

  }, [addEmployee]);
  

  /**
   *
   * JSX
   *
   */
  return (
    <div className="employees">
      <Grid container>
        {
          employees.map ((employee, i) => (
            <Grid key={employee.id} className={classes.root} item xs={3}>

              <Card className={classes.card}>

                <CardHeader title={employee.name.first + ' ' + employee.name.last} />
                <Divider variant="middle" />

                <CardContent>
                  <p className={classes.subtitle}>My Declaration to <br /> Win The Prize:</p>
                  {employee.quote}
                </CardContent>

                <Box className={classes.icons}>
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
