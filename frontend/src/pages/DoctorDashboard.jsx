import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SidebarDoctor from '../components/SidebarDoctor';
import Navbar from '../components/Navbar';
import Calendar from '../components/Calendar';
import Appointments from './DoctorAppointments'; 
import Patients from './DoctorPatients';           
import '../styles/Dashboard.css';

const DoctorDashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-body">
        <SidebarDoctor />
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <h1>Welcome Doctor</h1>
                <Calendar />

              </>
            } />
            <Route path="appointments" element={<Appointments />} />
            <Route path="patients" element={<Patients />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
