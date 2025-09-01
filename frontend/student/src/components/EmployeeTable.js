import React from 'react';


const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: 24
};
const thtd = {
  border: '1px solid #ddd',
  padding: 8,
  textAlign: 'left'
};
const actionBtn = {
  marginRight: 6,
  padding: '4px 10px',
  border: '1px solid #888',
  borderRadius: 4,
  background: '#f5f5f5',
  cursor: 'pointer'
};

const EmployeeTable = ({ employees, onView, onEdit, onDelete }) => (
  <table style={tableStyle}>
    <thead>
      <tr>
        <th style={thtd}>Name</th>
        <th style={thtd}>Email</th>
        <th style={thtd}>Role</th>
        <th style={thtd}>Salary</th>
        <th style={thtd}>Status</th>
        <th style={thtd}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {employees.map(emp => {
        const rowId = emp._id || emp.id; // support Mongo _id
        return (
          <tr key={rowId}>
            <td style={thtd}>{emp.name}</td>
            <td style={thtd}>{emp.email}</td>
            <td style={thtd}>{emp.role}</td>
            <td style={thtd}>{emp.salary}</td>
            <td style={thtd}>{emp.status}</td>
            <td style={thtd}>
              <button style={actionBtn} onClick={() => onView(rowId)}>View</button>
              <button style={actionBtn} onClick={() => onEdit(rowId)}>Edit</button>
              <button style={actionBtn} onClick={() => onDelete(rowId)}>Delete</button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default EmployeeTable;
