import React, { useState, useEffect } from "react";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentTable from "../components/AppointmentTable";

const AppointmentPage = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      const pid = localStorage.getItem("pid"); // Retrieve patient ID from localStorage
      if (!pid) {
        setError("Patient ID not found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/api/appointments?patient_id=${pid}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments.");
        }

        const data = await response.json();
        console.log(data);
        setAppointments(data || []);
      } catch (err) {
        setError("Error fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" }}>
      <h2 style={{ textAlign: "center", fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}>
        Book an Appointment
      </h2>

      <div style={{ width: "100%", maxWidth: "600px", marginBottom: "30px" }}>
        <AppointmentForm pid={patientId} setAppointments={setAppointments} />
      </div>

      <h3 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "10px" }}>Your Appointments</h3>

      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <AppointmentTable appointments={appointments} />
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
