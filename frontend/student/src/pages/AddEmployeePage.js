import React from 'react';
import { addEmployee } from '../services/employeeService';
import EmployeeForm from '../components/EmployeeForm';
import { useNavigate } from 'react-router-dom';
import studentUUID from '../studentUUID';

const AddEmployeePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await addEmployee(data, studentUUID);
    navigate('/');
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <EmployeeForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddEmployeePage;
