// React & Component
import { useState, useEffect } from 'react';
import './Employees.css';
import EmployeeEditModal from '../modal/EmployeeEditModal/EmployeeEditModal';
import EmployeeDeleteModal from '../modal/EmployeeDeleteModal/EmployeeDeleteModal';

// JavaScript Plugin
import $api from 'axios';
import rq from 'random-quotes';
import { v4 as uuidv4 } from 'uuid';

// CSS Framework
// import { Card } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

const useStyles = makeStyles (theme => ({
  cardGrid: {
    padding: theme.spacing (2),
  },
  card: {
    textAlign: 'center',
    color: theme.palette.success.main,
  },
}));

function Employees({addedEmployee}) {

  const [employees, setEmployees] = useState([]);
  const [triggerModalCount, setTriggerModalCount] = useState(0);
  const [modalType, setModalType] = useState(null);
  const [editTarget, setEditTarget] = useState({});

  // Show modal & pass selected employee data to modal.
  const handleEditModalData = (dataset, i) => {

    setEditTarget ({...dataset.employee, order: i});

    // Trigger direct type of children show or hide modal by update trigger count.
    setTriggerModalCount(triggerModalCount + 1);
    setModalType(dataset.type);
  };

  // Update selected employee's data.
  const handleEditEmployee = (editedEmployee) => {

    const pos = editTarget.order;

    setEmployees(prevEmployees => {

      prevEmployees[pos].name = editedEmployee.name;
      prevEmployees[pos].quote = editedEmployee.quote;

      const updatedEmployees = [...prevEmployees];
      return updatedEmployees;
    });
  };

  // Delete selected employee's data.
  const handleDeleteEmployee = () => {

    const pos = editTarget.order;

    setEmployees(prevEmployees => {

      prevEmployees.splice (pos, 1);

      const updatedEmployees = [...prevEmployees];
      return updatedEmployees;
    });
  };

  useEffect(() => {

    // Retrieve (initialize) employees' data.
    $api.get('https://randomuser.me/api/?results=10')
      .then (res => {
        
        const cleanSource = [...res.data.results];
        const employeeList = cleanSource.map(employee => {
          return {name: employee.name, quote: rq().body, id: uuidv4()};
        });
        
        setEmployees(employeeList);
      });
  }, []);

  useEffect(() => {

    if (Object.keys(addedEmployee).length <= 0) 
      return;

    setEmployees ([...employees, addedEmployee]);

  }, [addedEmployee]);

  const classes = useStyles ();
  
  return (
    <div className="employees">
      <Grid container>

        {
          employees.map ((employee, i) => (
            <Grid key={employee.id} className={classes.cardGrid} item xs={3}>
              <Card style={{ height: 100 + '%' }} className={classes.card}>
                <CardHeader title={employee.name.first + ' ' + employee.name.last} />
                <CardContent>
                  My Declaration to Win The Prize:
                  <br/>
                  {employee.quote}
                </CardContent>

                <IconButton onClick={() => handleEditModalData ({employee, type: 'edit'}, i)}>
                  <CreateRoundedIcon />
                </IconButton>

                <IconButton onClick={() => handleEditModalData ({employee, type: 'delete'}, i)}>
                  <DeleteForeverRoundedIcon />
                </IconButton>
              </Card>
            </Grid>
          ))
        }
      </Grid>

      <EmployeeEditModal triggerModalCount={triggerModalCount} modalType={modalType} editTarget={editTarget} handleEditEmployee={handleEditEmployee}></EmployeeEditModal>
      <EmployeeDeleteModal triggerModalCount={triggerModalCount} modalType={modalType} editTarget={editTarget} handleDeleteEmployee={handleDeleteEmployee}></EmployeeDeleteModal>
    </div>
  );
}

export default Employees;
