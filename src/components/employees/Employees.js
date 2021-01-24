import { useState, useEffect } from 'react';
import './Employees.css';

import $api from 'axios';
import rq from 'random-quotes';

import { Card } from 'react-bootstrap';

import Lightbox from '../lightbox/Lightbox';

function Employees (props) {

  const [employees, setEmployees] = useState ([]);
  // const [show, setShow] = useState (false);
  const [trigger, setTrigger] = useState (0);
  const [editTarget, setEditTarget] = useState ({});

  const handleLightboxData = (employee, i) => {
    setEditTarget ({...employee, order: i});
    // setShow (true);

    setTrigger (trigger + 1);
  };

  // const handleCloseLightbox = () => setShow (false);

  const handleEditEmployee = (editedEmployee) => {

    const pos = editTarget.order;

    console.log (pos);

    // employees[pos].name.first = editedEmployee.name.first;
    // employees[pos].name.last = editedEmployee.name.last;
    // employees[pos].quote = editedEmployee.quote;

    setEmployees (prevEmployees => {

      console.log (prevEmployees[pos]);
      
      // prevEmployees[pos].name.first = editedEmployee.name.first;
      // prevEmployees[pos].name.last = editedEmployee.name.last;
      // prevEmployees[pos].quote = editedEmployee.quote;

      prevEmployees[pos].name = editedEmployee.name;
      prevEmployees[pos].quote = editedEmployee.quote;

      console.log (prevEmployees);

      const newEmployees = [...prevEmployees];
      
      return newEmployees;
    })
  };

  useEffect (() => {

    $api.get ('https://randomuser.me/api/?results=10')
      .then (res => {

        console.log (res.data.results);
        
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

      {/* <Lightbox handleClose={ handleCloseLightbox } isShow={ show } employee={ editTarget } handleEdit={ handleEditEmployee }></Lightbox> */}
      <Lightbox triggerCount={ trigger } employee={ editTarget } handleEdit={ handleEditEmployee }></Lightbox>
    </div>
  );
}

export default Employees;
