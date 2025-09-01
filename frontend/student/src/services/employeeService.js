import axios from 'axios';


const API_BASE_URL = '/api/employees'; // Adjust as needed

// Helper to add UUID header
const uuidHeader = (studentUUID) => ({ headers: { 'X-Student-UUID': studentUUID } });


export const getEmployees = (studentUUID) =>
  axios.get(API_BASE_URL, uuidHeader(studentUUID));


export const getEmployee = (id, studentUUID) =>
  axios.get(`${API_BASE_URL}/${id}`, uuidHeader(studentUUID));


export const addEmployee = (employee, studentUUID) =>
  axios.post(API_BASE_URL, employee, uuidHeader(studentUUID));


export const updateEmployee = (id, employee, studentUUID) =>
  axios.put(`${API_BASE_URL}/${id}`, employee, uuidHeader(studentUUID));


export const deleteEmployee = (id, studentUUID) =>
  axios.delete(`${API_BASE_URL}/${id}`, uuidHeader(studentUUID));
