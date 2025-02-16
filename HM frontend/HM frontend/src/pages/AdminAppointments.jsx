import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState({});

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/appointments");
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setLoading(false);
    }
  };

  const updateStatus = async (appointmentId) => {
    const newStatus = selectedStatuses[appointmentId]; // Get the selected status

    if (!newStatus) {
      alert("Please select a status before updating.");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/admin/appointments/${appointmentId}`, { newStatus });
      fetchAppointments(); // Refresh the data after update
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const handleStatusChange = (appointmentId, value) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [appointmentId]: value,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", marginBottom: "200px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Appointments</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4" }}>
            <th style={headerStyle}>ID</th>
            <th style={headerStyle}>Patient ID</th>
            <th style={headerStyle}>Disease Type</th>
            <th style={headerStyle}>Date</th>
            <th style={headerStyle}>Time</th>
            <th style={headerStyle}>Status</th>
            <th style={headerStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.appointment_id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={cellStyle}>{appointment.appointment_id}</td>
              <td style={cellStyle}>{appointment.patient_id}</td>
              <td style={cellStyle}>{appointment.disease_type}</td>
              <td style={cellStyle}>{appointment.appointment_date}</td>
              <td style={cellStyle}>{appointment.appointment_time}</td>
              <td style={{ ...cellStyle, color: "#555" }}>{appointment.status}</td>
              <td style={cellStyle}>
                <select
                  value={selectedStatuses[appointment.appointment_id] || appointment.status}
                  onChange={(e) => handleStatusChange(appointment.appointment_id, e.target.value)}
                  style={selectStyle}
                >
                  <option value="processing">Processing</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                </select>
                <button onClick={() => updateStatus(appointment.appointment_id)} style={buttonStyle}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headerStyle = {
  padding: "10px",
  borderBottom: "2px solid #ddd",
};

const cellStyle = {
  padding: "10px",
};

const selectStyle = {
  padding: "5px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  marginRight: "10px",
  cursor: "pointer",
};

const buttonStyle = {
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "10px",
  cursor: "pointer",
};

export default AdminAppointments;
