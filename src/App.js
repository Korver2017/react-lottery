// React & Component
import { useState } from 'react';
import './App.css';
import Employees from './components/employees/Employees';
import EmployeeAddModal from './components/modal/EmployeeAddModal/EmployeeAddModal';

function App () {

  const [showModal, setShowModal] = useState(false);
  const [addedEmployee, setAddedEmployee] = useState (null);

  const handleTriggerModal = () => {
    console.log ('handleTriggerModal');
    setShowModal (preValue => !preValue);
  }

  function handleAddEmployee (addedEmployee) {

    console.log (addedEmployee);
    console.log ('handleAddEmployee');

    setAddedEmployee (addedEmployee);
  };
  
  return (
    <div className="App">
      {/* <EmployeeAdd  /> */}

      <div onClick={handleTriggerModal} className="plus fas fa-plus-circle" />
      <EmployeeAddModal showModal={showModal} handleTriggerModal={handleTriggerModal} />

      <Employees addedEmployee={ addedEmployee } />
    </div>
  );
}

export default App;
