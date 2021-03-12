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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

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
  
  return (
    <div className="employees">
      <div className="container">
        <div className="row">
          
          {
            employees.map ((employee, i) => (

              <Card key={employee.id}>
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
            ))
          }
        </div>
      </div>

      <EmployeeEditModal triggerModalCount={triggerModalCount} modalType={modalType} editTarget={editTarget} handleEditEmployee={handleEditEmployee}></EmployeeEditModal>
      <EmployeeDeleteModal triggerModalCount={triggerModalCount} modalType={modalType} editTarget={editTarget} handleDeleteEmployee={handleDeleteEmployee}></EmployeeDeleteModal>
    </div>
  );
}

export default Employees;
