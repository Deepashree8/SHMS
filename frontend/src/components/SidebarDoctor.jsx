// src/components/SidebarDoctor.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const SidebarDoctor = () => {
  return (
    <div className="sidebar">
        <NavLink to="/doctor/appointments" className="sidebar-link">Appointments</NavLink>
        <NavLink to="/doctor/patients" className="sidebar-link">Patients</NavLink>
    </div>
  );
};

export default SidebarDoctor;
