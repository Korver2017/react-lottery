import { useState, useEffect } from 'react';
import './Employees.css';

import $api from 'axios';
import rq from 'random-quotes';
import clsx from 'clsx';

import { Card, Button } from 'react-bootstrap';

function Employees (props) {

  const [employees, setEmployees] = useState ([]);
  const [expand, setExpand] = useState (false);
  const cards = document.querySelectorAll ('.card');

  console.log (props);

  function toggle () {
    setExpand (! expand);
    console.log (expand);

    if (expand)
      cards.forEach (card => {card.classList.add ('expanded')});
    else
      cards.forEach (card => {card.classList.remove ('expanded')});
  };

  useEffect (() => {

    $api.get ('https://randomuser.me/api/?results=10')
      .then (res => {
        console.log (res.data.results);

        const raw = [...res.data.results];
        const variant = ['Primary', 'Secondary', 'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark'];

        if (props.addedEmployee != null)
          raw.push (props.addedEmployee);

        const list = raw.map ((employee, i) => (

          <Card
            bg={variant[i % variant.length].toLowerCase()}
            key={i}
            text={variant[i % variant.length].toLowerCase() === 'light' ? 'dark' : 'white'}
            style={{ width: '18rem', marginLeft: 100 + i * Math.random () * 10 }}
            // className={'mb-2', clsx ({'expanded': expand})}
            className='mb-2'
          >
            <Card.Header>{employee.name.first} {employee.name.last}</Card.Header>
            <Card.Body>
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
  }, [props.addedEmployee]);
  
  return (
    <div className="employees">
      <Button variant="success" onClick={toggle}>Success</Button>
      { employees }
    </div>
  );
}

export default Employees;
