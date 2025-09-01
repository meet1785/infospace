import React, { useEffect, useState } from 'react';
import { getEmployee, updateEmployee } from '../services/employeeService';
import EmployeeForm from '../components/EmployeeForm';
import { useNavigate, useParams } from 'react-router-dom';
import studentUUID from '../studentUUID';

const EditEmployeePage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Assume studentUUID is available via props or context
    getEmployee(id, studentUUID).then(res => setInitialData(res.data));
  }, [id, studentUUID]);

  const handleSubmit = async (data) => {
    await updateEmployee(id, data, studentUUID);
    navigate('/');
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Employee</h2>
      <EmployeeForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditEmployeePage;
