import React, { useState, useEffect } from 'react';
import SidebarDoctor from '../components/SidebarDoctor';
import Navbar from '../components/Navbar';
import '../styles/DoctorAppointment.css';

const DoctorAppointments = ({ doctorId: propDoctorId }) => {
  // TEMP: hardcoded fallback if doctorId not passed via props
  const doctorId = propDoctorId || "6833e0690028c2384a1989e0";

  const [appointments, setAppointments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!doctorId) return;

    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8000/appointments/doctor/${doctorId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const data = await response.json();

        // Sort by date and time
        data.sort((a, b) =>
          a.appointmentDate.localeCompare(b.appointmentDate) ||
          a.appointmentTime.localeCompare(b.appointmentTime)
        );

        setAppointments(data);
        if (data.length > 0) setSelectedId(data[0].id); // select first appointment by default
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);


  const selectedAppointment = appointments.find((appt) => appt.id === selectedId);

  const handleChange = (field, value) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === selectedId
          ? { ...appt, [field]: value }
          : appt
      )
    );
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <SidebarDoctor />
      <main className="main-content">
        <h2>Appointments</h2>

        {loading && <p>Loading appointments...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && appointments.length === 0 && (
          <p>No appointments found.</p>
        )}

        {!loading && !error && appointments.length > 0 && (
          <div className="appointments-container">
            <div className="appointments-list">
              <h3>Patients with Appointments</h3>
              <ul>
                {appointments.map(({ id, patient, appointmentDate, appointmentTime }) => (
                  <li
                    key={id}
                    className={selectedId === id ? 'selected' : ''}
                    onClick={() => setSelectedId(id)}
                  >
                    <img src={patient.face} alt={patient.name} className="patient-face" />
                    <div className="patient-info">
                      <p><strong>{patient.name}</strong></p>
                      <p>{patient.age} years, {patient.gender}</p>
                      <p>Diagnosis: {patient.diagnosis}</p>
                      <p>Appointment: {appointmentDate} at {appointmentTime}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {selectedAppointment && (
              <div className="appointment-details">
                <h3>Patient Details & Diagnosis</h3>
                <form onSubmit={e => e.preventDefault()}>
                  <label>
                    Name:
                    <input type="text" value={selectedAppointment.patient.name} readOnly />
                  </label>
                  <label>
                    Age:
                    <input type="number" value={selectedAppointment.patient.age} readOnly />
                  </label>
                  <label>
                    Gender:
                    <input type="text" value={selectedAppointment.patient.gender} readOnly />
                  </label>
                  <label>
                    Address:
                    <input type="text" value={selectedAppointment.patient.address} readOnly />
                  </label>
                  <label>
                    Height (cm):
                    <input type="number" value={selectedAppointment.patient.height} readOnly />
                  </label>
                  <label>
                    Weight (kg):
                    <input type="number" value={selectedAppointment.patient.weight} readOnly />
                  </label>
                  <label>
                    Blood Sugar Level:
                    <input type="number" value={selectedAppointment.patient.bloodSugarLevel} readOnly />
                  </label>
                  <label>
                    Blood Pressure:
                    <input type="text" value={selectedAppointment.patient.bloodPressure} readOnly />
                  </label>
                  <label>
                    Reason for Visit:
                    <textarea value={selectedAppointment.patient.reasonForVisit} readOnly />
                  </label>

                  <label>
                    Diagnosis:
                    <textarea
                      value={selectedAppointment.doctorDiagnosis}
                      onChange={(e) => handleChange('doctorDiagnosis', e.target.value)}
                      placeholder="Enter diagnosis here"
                    />
                  </label>

                  <label>
                    Remarks:
                    <textarea
                      value={selectedAppointment.remarks}
                      onChange={(e) => handleChange('remarks', e.target.value)}
                      placeholder="Enter remarks here"
                    />
                  </label>

                  <button onClick={() => alert('Saved successfully!')}>
                    Save
                  </button>
                </form>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorAppointments;

