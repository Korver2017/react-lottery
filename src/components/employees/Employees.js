import { useState, useEffect } from 'react';
import './Employees.css';

import $api from 'axios';

function Employees () {

  const [employees, setEmployees] = useState ([]);

  useEffect (() => {

    $api.get ('https://randomuser.me/api/?results=10')
      .then (res => {
        console.log (res.data.results);

        const raw = [...res.data.results];

        const list = raw.map (employee => (
          <li>{ employee.name.first }</li>
        ))

        setEmployees (list);
        
      })
    
  }, []);
  
  
  return (
    <div className="employees">
      { employees }
    </div>
  );
}

export default Employees;
