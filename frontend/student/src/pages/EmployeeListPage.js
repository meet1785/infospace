import React, { useEffect, useState } from 'react';
import { getEmployees, deleteEmployee } from '../services/employeeService';
import EmployeeTable from '../components/EmployeeTable';
import { useNavigate } from 'react-router-dom';
import studentUUID from '../studentUUID';

const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getEmployees(studentUUID);
      setEmployees(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to load employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    // eslint-disable-next-line
  }, [studentUUID]);

  const handleView = id => {
    alert('View details for employee ID: ' + id);
  };

  const handleEdit = id => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await deleteEmployee(id, studentUUID);
      fetchEmployees();
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to delete employee.');
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2>Employees</h2>
      <button style={{ marginBottom: 16 }} onClick={() => navigate('/add-employee')}>Add Employee</button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <EmployeeTable employees={employees} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default EmployeeListPage;
