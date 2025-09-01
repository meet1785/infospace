const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  studentUUID: { type: String, required: true, index: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  role: { type: String, default: 'Employee' },
  salary: { type: Number, default: 0, min: 0 },
  dateOfJoining: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
});

module.exports = mongoose.model('Employee', employeeSchema);
