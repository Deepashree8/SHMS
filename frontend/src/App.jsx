// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDetails from './pages/PatientDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/receptionist/*" element={<ReceptionistDashboard />} />
        <Route path="/doctor/*" element={<DoctorDashboard />} />
        <Route path="/patienrdetails" element={<PatientDetails/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
