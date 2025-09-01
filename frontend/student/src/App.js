


import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeListPage from './pages/EmployeeListPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';


function App() {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<EmployeeListPage />} />
  <Route path="/add-employee" element={<AddEmployeePage />} />
  <Route path="/edit-employee/:id" element={<EditEmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
