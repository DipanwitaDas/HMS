import React, { useEffect, useState } from "react";

const AdminPatient = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/admin/patients")
            .then((res) => res.json())
            .then((data) => setPatients(data))
            .catch((err) => console.error("Error fetching patients:", err));
    }, []);

    return (
        <div style={{
            padding: "20px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "10px"
        }}>
            <h2 style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
                Patient List
            </h2>
            <table style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
                fontSize: "18px"
            }}>
                <thead>
                    <tr style={{
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "20px"
                    }}>
                        <th style={{ padding: "15px", borderBottom: "2px solid white" }}>ID</th>
                        <th style={{ padding: "15px", borderBottom: "2px solid white" }}>Name</th>
                        <th style={{ padding: "15px", borderBottom: "2px solid white" }}>Gender</th>
                        <th style={{ padding: "15px", borderBottom: "2px solid white" }}>DOB</th>
                        <th style={{ padding: "15px", borderBottom: "2px solid white" }}>Contact</th>
                        <th style={{ padding: "15px", borderBottom: "2px solid white" }}>Email</th>
                        <th style={{ padding: "15px", borderBottom: "2px solid white" }}>Blood Group</th>
                        <th style={{ padding: "15px", borderBottom: "2px solid white" }}>Medical History</th>
                        <th style={{ padding: "15px", borderBottom: "2px solid white" }}>Registered</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient.patient_id} style={{
                            borderBottom: "1px solid white",
                            fontSize: "18px"
                        }}>
                            <td style={{ padding: "15px" }}>{patient.patient_id}</td>
                            <td style={{ padding: "15px", fontWeight: "bold" }}>
                                {patient.first_name} {patient.last_name}
                            </td>
                            <td style={{ padding: "15px" }}>{patient.gender}</td>
                            <td style={{ padding: "15px" }}>{patient.date_of_birth}</td>
                            <td style={{ padding: "15px" }}>{patient.contact_number}</td>
                            <td style={{ padding: "15px" }}>{patient.email}</td>
                            <td style={{ padding: "15px" }}>{patient.blood_group}</td>
                            <td style={{ padding: "15px" }}>{patient.medical_history || "N/A"}</td>
                            <td style={{ padding: "15px" }}>{new Date(patient.registration_date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPatient;
