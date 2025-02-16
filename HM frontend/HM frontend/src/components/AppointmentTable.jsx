import React from "react";

const AppointmentTable = ({ appointments }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
      <thead>
        <tr style={{ backgroundColor: "#e5e5e5" }}>
          <th style={{ padding: "8px", border: "1px solid #ccc" }}>Disease Type</th>
          <th style={{ padding: "8px", border: "1px solid #ccc" }}>Doctor</th>
          <th style={{ padding: "8px", border: "1px solid #ccc" }}>Appointment Date</th>
          <th style={{ padding: "8px", border: "1px solid #ccc" }}>Appointment Time</th>
          <th style={{ padding: "8px", border: "1px solid #ccc" }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <tr key={appointment.appointment_id}>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>{appointment.disease_type}</td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>{appointment.doctor_name}</td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>{appointment.appointment_date}</td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>{appointment.appointment_time}</td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>{appointment.state}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AppointmentTable;
