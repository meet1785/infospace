const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');


function getStudentUUID(req, res, next) {
  const uuid = req.header('X-Student-UUID');
  if (!uuid) return res.status(400).json({ message: 'Student UUID is required in header.' });
  req.studentUUID = uuid;
  next();
}

// Add  new employee
router.post('/', getStudentUUID, async (req, res) => {
  try {
    const { name, email, role, salary, dateOfJoining, status } = req.body;
    const employee = new Employee({
      studentUUID: req.studentUUID,
      name,
      email,
      role,
      salary,
      dateOfJoining,
      status
    });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.fromEntries(Object.entries(err.errors).map(([k,v]) => [k, v.message]));
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    res.status(400).json({ message: err.message });
  }
});


router.get('/', getStudentUUID, async (req, res) => {
  try {
    const employees = await Employee.find({ studentUUID: req.studentUUID });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single employee  ID 
router.get('/:id', getStudentUUID, async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id, studentUUID: req.studentUUID });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

// Update employee 
router.put('/:id', getStudentUUID, async (req, res) => {
  try {
    const update = { ...req.body };
    delete update.studentUUID;
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id, studentUUID: req.studentUUID },
      update,
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.fromEntries(Object.entries(err.errors).map(([k,v]) => [k, v.message]));
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    res.status(400).json({ message: err.message });
  }
});

// Delete employee 
router.delete('/:id', getStudentUUID, async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ _id: req.params.id, studentUUID: req.studentUUID });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

module.exports = router;
