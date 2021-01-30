// React & Component
import { useState } from 'react';
import './App.css';
import Employees from './components/employees/Employees';
import EmployeeAddModal from './components/modal/EmployeeAddModal/EmployeeAddModal';

function App () {

  const [showModal, setShowModal] = useState(false);
  const [addedEmployee, setAddedEmployee] = useState({});

  const handleTriggerModal = () => setShowModal (preValue => !preValue);
  const handleAddEmployee = (addedEmployee) => setAddedEmployee(addedEmployee);
  
  return (
    <div className="App">

      <div onClick={handleTriggerModal} className="plus fas fa-plus-circle" />

      <EmployeeAddModal showModal={showModal} handleTriggerModal={handleTriggerModal} handleAddEmployee={handleAddEmployee} />

      <Employees addedEmployee={addedEmployee}  />
    </div>
  );
}

export default App;
