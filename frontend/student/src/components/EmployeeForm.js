import React, { useState, useEffect } from 'react';


const EmployeeForm = ({ initialData, onSubmit }) => {
  const getInitialForm = (data = {}) => ({
    name: data.name || '',
    email: data.email || '',
    role: data.role || '',
    salary: data.salary !== undefined && data.salary !== null ? String(data.salary) : '',
    status: data.status || '',
  });
  const [form, setForm] = useState(getInitialForm(initialData || {}));
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(getInitialForm(initialData));
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.role) errs.role = 'Role is required';
    if (!form.salary) errs.salary = 'Salary is required';
    else if (isNaN(form.salary) || Number(form.salary) < 0) errs.salary = 'Salary must be a positive number';
    if (!form.status) errs.status = 'Status is required';
    return errs;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setApiError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      const data = err?.response?.data;
      if (data?.errors && typeof data.errors === 'object') {
        setErrors(prev => ({ ...prev, ...data.errors }));
      }
      setApiError(data?.message || err.message || 'An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      <input name="role" value={form.role} onChange={handleChange} placeholder="Role" required />
      {errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}
      <input name="salary" value={form.salary} onChange={handleChange} placeholder="Salary" required type="number" />
      {errors.salary && <span style={{ color: 'red' }}>{errors.salary}</span>}
      <input name="status" value={form.status} onChange={handleChange} placeholder="Status" required />
      {errors.status && <span style={{ color: 'red' }}>{errors.status}</span>}
      <button type="submit" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
      {apiError && <div style={{ color: 'red', marginTop: 8 }}>{apiError}</div>}
    </form>
  );
};

export default EmployeeForm;
