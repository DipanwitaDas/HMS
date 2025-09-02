import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorName, setDoctorName] = useState("");
  const [doctors, setDoctors] = useState([]);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  // Fetch doctors from the API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/doctors", {
          withCredentials: true,
        });

        if (Array.isArray(response.data)) {
          setDoctors(response.data);
        } else {
          console.error("Invalid response format, expected an array.");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle form submission
  const handleAppointment = async (e) => {
    e.preventDefault();
    
    // Validate date and doctor
    if (!appointmentDate) {
      return toast.error("Please select a valid appointment date.");
    }
  
    const selectedDoctor = doctors.find((doc) => doc.name === doctorName);
  
    if (!selectedDoctor) {
      return toast.error("Please select a valid doctor");
    }
  
    console.log("Selected Doctor Details:", selectedDoctor);
  
    // Convert patient_id to an integer before sending it
    const patientId = parseInt(localStorage.getItem("pid"), 10);
  
    // Ensure patientId is a valid number
    if (isNaN(patientId)) {
      return toast.error("Invalid patient ID.");
    }
  
    const appointmentData = {
      patient_id: patientId, // Now it's an integer
      disease_type: department,
      state:"processing",
      appointment_date: appointmentDate,
      appointment_time: "10:00:00", // Add time input in the form
      doctor_id: selectedDoctor.doctor_id,
      doctor_name: selectedDoctor.name,
    };
  
    console.log("Appointment Data:", appointmentData);
  
    try {
      const response = await fetch("http://localhost:3000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
        credentials: "include", // This is equivalent to withCredentials: true in axios
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error submitting form");
      }
  
      const data = await response.json();
  
      toast.success(data.message);
      resetForm();
    } catch (error) {
      toast.error(error.message || "Error submitting form");
    }
  };
  

  // Reset form fields
  const resetForm = () => {
    setAppointmentDate("");
    setDepartment("Pediatrics");
    setDoctorName("");
  };

  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>
      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorName("");
            }}
          >
            {departmentsArray.map((depart, index) => (
              <option value={depart} key={index}>
                {depart}
              </option>
            ))}
          </select>
          <select
            value={doctorName}
            onChange={(e) => {
              setDoctorName(e.target.value);
            }}
            disabled={!department}
          >
            <option value="">Select Doctor</option>
            {doctors.length > 0 ? (
              doctors
                .filter(
                  (doctor) =>
                    doctor.speciality?.trim().toLowerCase() ===
                    department.trim().toLowerCase()
                )
                .map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))
            ) : (
              <option disabled>No doctors available</option>
            )}
          </select>
        </div>
        <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
