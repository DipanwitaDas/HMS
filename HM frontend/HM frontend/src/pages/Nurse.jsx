import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

export default function Nurse() {
    const [nurses, setNurses] = useState([]);
    const [formData, setFormData] = useState({ name: "", email: "", availability: "", doctor_id: "" });
    const [deleteId, setDeleteId] = useState("");
    const [updateData, setUpdateData] = useState({ nurse_id: "", doctor_id: "" });

    useEffect(() => {
        fetchNurses();
    }, []);

    const fetchNurses = async () => {
        const res = await axios.get("http://localhost:3000/admin/nurses");
        setNurses(res.data);
    };

    const handleAddNurse = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/admin/nurses", formData);
        fetchNurses();
    };

    const handleDeleteNurse = async (e) => {
        e.preventDefault();
        await axios.delete(`http://localhost:3000/admin/nurses/${deleteId}`);
        fetchNurses();
    };

    const handleUpdateNurse = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:3000/admin/nurses/${updateData.nurse_id}`, { doctor_id: updateData.doctor_id });
        fetchNurses();
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: "100vh", padding: "20px" }}>
            
            {/* Table */}
            <table style={{ width: "80%", margin: "20px 0", textAlign: "center", borderCollapse: "collapse", fontSize: "20px" }}>
                <thead>
                    <tr style={{ borderBottom: "3px solid black", background: "#f4f4f4", fontWeight: "bold" }}>
                        <th style={{ padding: "15px" }}>Nurse ID</th>
                        <th style={{ padding: "15px" }}>Name</th>
                        <th style={{ padding: "15px" }}>Email</th>
                        <th style={{ padding: "15px" }}>Availability</th>
                        <th style={{ padding: "15px" }}>Doctor ID</th>
                    </tr>
                </thead>
                <tbody>
                    {nurses.map(nurse => (
                        <tr key={nurse.nurse_id} style={{ borderBottom: "2px solid lightgrey" }}>
                            <td style={{ padding: "15px", fontWeight: "bold" }}>{nurse.nurse_id}</td>
                            <td style={{ padding: "15px" }}>{nurse.name}</td>
                            <td style={{ padding: "15px" }}>{nurse.email}</td>
                            <td style={{ padding: "15px" }}>{nurse.availability}</td>
                            <td style={{ padding: "15px" }}>{nurse.doctor_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Forms Container */}
            <div style={{ display: "flex", justifyContent: "center", gap: "40px", marginBottom: "50px" }}>
                {/* Add Nurse Form */}
                <form onSubmit={handleAddNurse} style={{ display: "flex", flexDirection: "column", gap: "15px", fontSize: "18px" }}>
                    <input type="text" placeholder="Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} required 
                        style={{ padding: "12px", fontSize: "18px", borderRadius: "8px", border: "2px solid black" }} />
                    <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} required 
                        style={{ padding: "12px", fontSize: "18px", borderRadius: "8px", border: "2px solid black" }} />
                    <input type="text" placeholder="Availability" onChange={(e) => setFormData({ ...formData, availability: e.target.value })} required 
                        style={{ padding: "12px", fontSize: "18px", borderRadius: "8px", border: "2px solid black" }} />
                    <input type="number" placeholder="Doctor ID" onChange={(e) => setFormData({ ...formData, doctor_id: e.target.value })} 
                        style={{ padding: "12px", fontSize: "18px", borderRadius: "8px", border: "2px solid black" }} />
                    <button type="submit" style={{ background: "black", color: "white", borderRadius: "8px", padding: "12px", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>Add Nurse</button>
                </form>

                {/* Delete Nurse Form */}
                <form onSubmit={handleDeleteNurse} style={{ display: "flex", flexDirection: "column", gap: "15px", fontSize: "18px" }}>
                    <input type="number" placeholder="Nurse ID" onChange={(e) => setDeleteId(e.target.value)} required 
                        style={{ padding: "12px", fontSize: "18px", borderRadius: "8px", border: "2px solid black" }} />
                    <button type="submit" style={{ background: "black", color: "white", borderRadius: "8px", padding: "12px", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>Delete Nurse</button>
                </form>
            </div>

            {/* Update Nurse Form */}
            <form onSubmit={handleUpdateNurse} style={{ display: "flex", flexDirection: "column", gap: "15px", fontSize: "18px", marginBottom: "50px" }}>
                <input type="number" placeholder="Nurse ID" onChange={(e) => setUpdateData({ ...updateData, nurse_id: e.target.value })} required 
                    style={{ padding: "12px", fontSize: "18px", borderRadius: "8px", border: "2px solid black" }} />
                <input type="number" placeholder="New Doctor ID" onChange={(e) => setUpdateData({ ...updateData, doctor_id: e.target.value })} required 
                    style={{ padding: "12px", fontSize: "18px", borderRadius: "8px", border: "2px solid black" }} />
                <button type="submit" style={{ background: "black", color: "white", borderRadius: "8px", padding: "12px", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>Update Doctor ID</button>
            </form>
        </div>
    );
}
