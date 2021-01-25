// React & Component
import { useState, useEffect } from 'react';
import './Employees.css';
import Lightbox from '../lightbox/Lightbox';

// JavaScript Plugin
import $api from 'axios';
import rq from 'random-quotes';

// CSS Plugin
import { Card } from 'react-bootstrap';

function Employees (props) {

  const [employees, setEmployees] = useState ([]);
  const [trigger, setTrigger] = useState (0);
  const [editTarget, setEditTarget] = useState ({});

  // Show lightbox & pass selected employee data to lightbox.
  const handleLightboxData = (employee, i) => {

    setEditTarget ({...employee, order: i});
    // Trigger children show or hide lightbox by update trigger count.
    setTrigger (trigger + 1);
  };

  // Update selected employee's data.
  const handleEditEmployee = (editedEmployee) => {

    const pos = editTarget.order;

    setEmployees (prevEmployees => {

      prevEmployees[pos].name = editedEmployee.name;
      prevEmployees[pos].quote = editedEmployee.quote;

      const updatedEmployees = [...prevEmployees];
      return updatedEmployees;
    })
  };

  useEffect (() => {

    // Retrieve (initialize) employees' data.
    $api.get ('https://randomuser.me/api/?results=10')
      .then (res => {
        const employeeList = [...res.data.results];
        employeeList.forEach (employee => employee.quote = rq ().body);
        setEmployees (employeeList);
      });
  }, []);

  useEffect (() => {

    console.log (props);

    if (! props.addedEmployee)
      return;

    setEmployees ([...employees, props.addedEmployee]);

  }, [props.addedEmployee]);
  
  return (
    <div className="employees">
      <div className="container">
        <div className="row">
          {
            employees.map ((employee, i) => (
              <Card
              bg="light"
              key={employee.id.value + i}
              text="dark"
              className='mb-2 position-relative'
              >
                <Card.Header className="font-weight-bold">{ employee.name.first } { employee.name.last }</Card.Header>
                <Card.Body>
                  <Card.Text className="font-weight-bold">
                    My Declaration to Win The Prize:
                  </Card.Text>
                  <Card.Text className="text-left">
                    { employee.quote }
                  </Card.Text>
                </Card.Body>

                <div className="editor position-absolute">
                  <i onClick={ () => handleLightboxData (employee, i) } className="fas fa-edit edit"></i>
                  <i className="fas fa-trash trash"></i>
                </div>
              </Card>
            ))
          }
        </div>
      </div>

      <Lightbox triggerCount={ trigger } employee={ editTarget } handleEdit={ handleEditEmployee }></Lightbox>
    </div>
  );
}

export default Employees;
