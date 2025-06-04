import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import DoctorDashboard from './pages/DoctorDashboard'; // Add this only if implemented
import DoctorAppointments from './pages/DoctorAppointments';

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/patients" element={<DoctorPatients />} />
            <Route path="/login" element={<Login />} />
            <Route path="/receptionist" element={<ReceptionistDashboard />} />
            <Route path="/receptionist/patients" element={<ReceptionistPatients />} />
            <Route path="/receptionist/appointments" element={<ReceptionistAppointments />} />
            <Route path="/receptionist/add-patient" element={<AddPatient />} />
            <Route path="/receptionist/make-appointment" element={<MakeAppointment />} />
        </Routes>

    </Router>
  );
};

export default AppRoutes;
