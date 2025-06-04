import React, { useState, useRef, useEffect } from 'react';
import SidebarReceptionist from '../components/SidebarReceptionist';
import Navbar from '../components/Navbar';
import '../styles/AddPatient.css';

const AddPatient = () => {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    age: '',
    gender: '',
    phone: '',
    emailid: '',
    address: '',
    height: '',
    weight: '',
    bloodPressure: '',
    reason: '',
  });

  const [photo, setPhoto] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Start or stop camera depending on cameraOn state
  useEffect(() => {
    if (cameraOn) {
      // Start camera
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        } catch (err) {
          console.error('Error accessing webcam:', err);
          setCameraOn(false);
        }
      };
      startCamera();
    } else {
      // Stop camera
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
    // Cleanup on unmount or cameraOff
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraOn]);

  const handleCapture = () => {
    if (!cameraOn) {
      // If camera is off, turn it on (toggle)
      setCameraOn(true);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataURL = canvas.toDataURL('image/png');
    setPhoto(imageDataURL);

    // Turn off camera immediately after capture
    setCameraOn(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Patient Added:', { ...form, photo });
    alert('Patient added successfully!');
    setForm({
      name: '',
      dob: '',
      age: '',
      gender: '',
      address: '',
      phone: '',
      emailid: '',
      height: '',
      weight: '',
      bloodPressure: '',
      reason: '',
    });
    setPhoto(null);
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <SidebarReceptionist />

      <div className="main-content">
        <h2 className="add-patient-title">Add New Patient</h2>
        <form className="add-patient-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="dob"
            placeholder="Date of Birth"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Male">Other</option>
          </select>

          <input
            type="text"
            name="phone"
            placeholder="Contact Number"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="emailid"
            placeholder="Email-ID"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="height"
            placeholder="Height (cm)"
            value={form.height}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="weight"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="bloodPressure"
            placeholder="Blood Pressure"
            value={form.bloodPressure}
            onChange={handleChange}
            required
          />

          <textarea
            name="reason"
            placeholder="Reason for Visit"
            value={form.reason}
            onChange={handleChange}
            required
          />

          {/* Webcam Video Stream - only show if cameraOn is true */}
          {cameraOn && (
            <div className="webcam-container" style={{ marginTop: '15px' }}>
              <video
                ref={videoRef}
                style={{ width: '300px', borderRadius: '8px', border: '1px solid #ccc' }}
                autoPlay
                muted
              />
            </div>
          )}

          {/* Hidden canvas for capturing photo */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {/* Photo preview */}
          {photo && (
            <div className="photo-preview" style={{ marginTop: '15px' }}>
              <p>Captured Photo:</p>
              <img
                src={photo}
                alt="Captured"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                }}
              />
            </div>
          )}

          {/* Button toggles camera on/off before capture, then capture and turn off */}
          <button
            type="button"
            onClick={handleCapture}
            style={{ marginTop: '20px' }}
          >
            {cameraOn ? 'Capture Photo' : 'Start Camera'}
          </button>

          <button type="submit" style={{ marginTop: '20px', marginLeft: '10px' }}>
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
