import { useState, useEffect } from 'react';
import './Employees.css';

import $api from 'axios';
import rq from 'random-quotes';

import { Card } from 'react-bootstrap';

import Lightbox from '../lightbox/Lightbox';

function Employees (props) {

  const [employees, setEmployees] = useState ([]);
  const [show, setShow] = useState (false);
  const [editTarget, setEditTarget] = useState ({});

  // const handleShow = (employee) => {
  const handleShow = (employee, i) => {
    setEditTarget ({...employee, order: i});
    setShow (true);
  };
  
  const handleCloseLightbox = () => setShow (false);

  const handleEditEmployee = (target) => {
    console.log (editTarget.order);
    console.log (target);

    const pos = editTarget.order;

    employees[pos].name = target.name;
    employees[pos].quote = target.quote;

    console.log (employees);

    // setEmployees ([...employees, employees[pos] = target])
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
                  <i onClick={ () => handleShow (employee, i) } className="fas fa-edit edit"></i>
                  {/* <i onClick={ handleShow (i) } className="fas fa-edit edit"></i> */}
                  <i className="fas fa-trash trash"></i>
                </div>
              </Card>
            ))
          }
        </div>
      </div>

      <Lightbox handleClose={ (isClose) => handleCloseLightbox (isClose) } isShow={ show } employee={ editTarget } handleEdit={ handleEditEmployee }></Lightbox>
    </div>
  );
}

export default Employees;
