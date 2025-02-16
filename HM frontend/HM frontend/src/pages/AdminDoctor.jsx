import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [doctorData, setDoctorData] = useState({ name: "", email: "", phone_number: "", availability_time: "", speciality: "" });
  const [doctorId, setDoctorId] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/admin/doctors", doctorData);
      fetchDoctors();
      setDoctorData({ name: "", email: "", phone_number: "", availability_time: "", speciality: "" });
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  const handleDeleteDoctor = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/admin/doctors/${doctorId}`);
      fetchDoctors();
      setDoctorId("");
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", textAlign: "center" }}>
      <h2 style={{ fontSize: "32px", fontWeight: "bold" }}>Doctor Management</h2>
      
      <table style={{ width: "100%", borderCollapse: "collapse", background: "transparent", color: "#333", marginBottom: "30px", fontSize: "20px", fontWeight: "bold" }}>
        <thead>
          <tr style={{ background: "lightgrey" }}>
            <th style={{ padding: "15px", border: "2px solid #000" }}>ID</th>
            <th style={{ padding: "15px", border: "2px solid #000" }}>Name</th>
            <th style={{ padding: "15px", border: "2px solid #000" }}>Email</th>
            <th style={{ padding: "15px", border: "2px solid #000" }}>Phone</th>
            <th style={{ padding: "15px", border: "2px solid #000" }}>Availability</th>
            <th style={{ padding: "15px", border: "2px solid #000" }}>Speciality</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr key={doctor.doctor_id}>
                <td style={{ padding: "15px", border: "2px solid #000" }}>{doctor.doctor_id}</td>
                <td style={{ padding: "15px", border: "2px solid #000" }}>{doctor.name}</td>
                <td style={{ padding: "15px", border: "2px solid #000" }}>{doctor.email}</td>
                <td style={{ padding: "15px", border: "2px solid #000" }}>{doctor.phone_number}</td>
                <td style={{ padding: "15px", border: "2px solid #000" }}>{doctor.availability_time}</td>
                <td style={{ padding: "15px", border: "2px solid #000" }}>{doctor.speciality}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ padding: "15px", border: "2px solid #000", textAlign: "center" }}>
                No doctors found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        {/* Add Doctor Form */}
        <form onSubmit={handleAddDoctor} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "22px" }}>Add Doctor</h3>
          <input type="text" placeholder="Name" value={doctorData.name} onChange={(e) => setDoctorData({ ...doctorData, name: e.target.value })} required style={{ padding: "12px", fontSize: "18px", width: "250px" }} />
          <input type="email" placeholder="Email" value={doctorData.email} onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })} required style={{ padding: "12px", fontSize: "18px", width: "250px" }} />
          <input type="text" placeholder="Phone Number" value={doctorData.phone_number} onChange={(e) => setDoctorData({ ...doctorData, phone_number: e.target.value })} required style={{ padding: "12px", fontSize: "18px", width: "250px" }} />
          <input type="text" placeholder="Availability Time" value={doctorData.availability_time} onChange={(e) => setDoctorData({ ...doctorData, availability_time: e.target.value })} required style={{ padding: "12px", fontSize: "18px", width: "250px" }} />
          <input type="text" placeholder="Speciality" value={doctorData.speciality} onChange={(e) => setDoctorData({ ...doctorData, speciality: e.target.value })} required style={{ padding: "12px", fontSize: "18px", width: "250px" }} />
          <button type="submit" style={{ background: "black", color: "white", borderRadius: "5px", padding: "12px 18px", fontSize: "18px" }}>Add Doctor</button>
        </form>
        
        {/* Delete Doctor Form */}
        <form onSubmit={handleDeleteDoctor} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
          <h3 style={{ fontWeight: "bold", fontSize: "22px" }}>Delete Doctor</h3>
          <input type="text" placeholder="Doctor ID" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required style={{ padding: "12px", fontSize: "18px", width: "250px" }} />
          <button type="submit" style={{ background: "black", color: "white", borderRadius: "5px", padding: "12px 18px", fontSize: "18px" }}>Delete</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorManagement;
