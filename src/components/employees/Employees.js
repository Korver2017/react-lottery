import { useState, useEffect } from 'react';
import './Employees.css';

import $api from 'axios';
import rq from 'random-quotes';

import { Card } from 'react-bootstrap';

function Employees () {

  const [employees, setEmployees] = useState ([]);

  useEffect (() => {

    $api.get ('https://randomuser.me/api/?results=10')
      .then (res => {
        console.log (res.data.results);

        const raw = [...res.data.results];
        const variant = ['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark'];

        const list = raw.map ((employee, i) => (

          <Card
            bg={variant[i % variant.length].toLowerCase()}
            key={i}
            text={variant[i % variant.length].toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '18rem', marginLeft: 100 + i * Math.random () * 10 }}
            className="mb-2"
          >
            <Card.Header>{employee.name.first} {employee.name.last}</Card.Header>
            <Card.Body>
              <Card.Title>{variant[i % variant.length]} Card Title </Card.Title>
              <Card.Text>
                My Declaration to Win The Prize:
              </Card.Text>
              <Card.Text>
                { rq ().body }
              </Card.Text>
            </Card.Body>
          </Card>
        ))

        setEmployees (list);
      });
    
  }, []);
  
  
  return (
    <div className="employees">
      { employees }
    </div>
  );
}

export default Employees;
