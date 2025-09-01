require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB(){
  if(!MONGODB_URI){
    console.log('No MONGODB_URI provided. Starting in-memory MongoDB...');
    const mem = await MongoMemoryServer.create();
    const uri = mem.getUri();
    await mongoose.connect(uri);
    console.log('In-memory MongoDB connected');
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (err){
    console.error('MongoDB connection error, falling back to in-memory:', err.message);
    const mem = await MongoMemoryServer.create();
    const uri = mem.getUri();
    await mongoose.connect(uri);
    console.log('In-memory MongoDB connected');
  }
}

connectDB();


// Employee routes
app.use('/api/employees', require('./routes/employees'));

app.get('/', (req, res) => {
  res.send('Employee Management API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
