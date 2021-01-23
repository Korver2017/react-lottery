import './App.css';
import Employees from './components/employees/Employees';
import EmployeeAdd from './components/employeeAdd/EmployeeAdd';

import { useState } from 'react';

function App() {

  const [addedEmployee, setAddedEmployee] = useState (null);

  function handleAddEmployee (addedEmployee) {

    console.log (addedEmployee);
    console.log ('handleAddEmployee');

    setAddedEmployee (addedEmployee);
  };
  
  return (
    <div className="App">
      <EmployeeAdd handleAddEmployee={ (employee) => handleAddEmployee (employee) } />
      <Employees addedEmployee={ addedEmployee } />
    </div>
  );
}

export default App;
