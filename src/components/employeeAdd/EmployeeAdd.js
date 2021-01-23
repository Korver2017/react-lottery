import { useState, useEffect } from 'react';
import './EmployeeAdd.css';

import { FormControl, Button, InputGroup } from 'react-bootstrap';

function EmployeeAdd (props) {

  function handleAddClick () {

    console.log ('handleAddClick');

    let input = document.querySelector ('.form-control');
    let addedEmployee = { name: { first: '', last: '' }, id: { value: '' } };
    
    addedEmployee.name.first = input.value;
    addedEmployee.name.last = input.value;
    addedEmployee.quote = input.value;
    addedEmployee.id.value = input.value;

    console.log (addedEmployee);

    input.value = '';
    
    props.handleAddEmployee (addedEmployee);
  };
  
  return (
    <div className="employeeAdd">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Add Employee"
          aria-label="Add Employee"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={ handleAddClick }>Button</Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
}

export default EmployeeAdd;
