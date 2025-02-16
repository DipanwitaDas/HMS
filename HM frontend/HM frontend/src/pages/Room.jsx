import { useState, useEffect } from "react";
import React from "react";

const Room = () => {
    const [rooms, setRooms] = useState([]);
    const [search, setSearch] = useState("");
    const [roomNumber, setRoomNumber] = useState("");
    const [patientInput, setPatientInput] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/admin/rooms")
            .then((res) => res.json())
            .then((data) => setRooms(data));
    }, []);

    const updatePatients = () => {
        const patientIds = patientInput
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id !== "");

        const roomToUpdate = rooms.find((room) => room.room_number.toString() === roomNumber);
        if (!roomToUpdate) {
            alert("Room number not found.");
            return;
        }

        fetch(`http://localhost:3000/admin/rooms/${roomNumber}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patientIds }),
        }).then(() => {
            setRooms(
                rooms.map((room) =>
                    room.room_number.toString() === roomNumber
                        ? { ...room, patient_ids: patientIds.join(", ") }
                        : room
                )
            );
            setRoomNumber("");
            setPatientInput("");
        });
    };

    const filteredRooms = rooms.filter(
        (room) =>
            room.room_number.toString().includes(search) ||
            room.room_type.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Room Management</h1>
                <p style={styles.subtitle}>Manage room assignments, patient allocations, and availability.</p>
            </div>

            <input
                type="text"
                placeholder="Search by Room Number or Type..."
                style={styles.input}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table style={styles.table}>
                <thead style={styles.thead}>
                    <tr>
                        <th style={styles.th}>Room No</th>
                        <th style={styles.th}>Type</th>
                        <th style={styles.th}>Capacity</th>
                        <th style={styles.th}>Patients</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRooms.length > 0 ? (
                        filteredRooms.map((room) => (
                            <tr key={room.room_number} style={styles.tr}>
                                <td style={styles.td}>{room.room_number}</td>
                                <td style={styles.td}>{room.room_type}</td>
                                <td style={styles.td}>{room.bed_capacity}</td>
                                <td style={styles.td}>{room.patient_ids || "None"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={styles.noData}>No rooms found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div style={styles.formContainer}>
                <h2 style={styles.formTitle}>Update Patient List</h2>
                <label style={styles.label}>Room Number:</label>
                <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    style={styles.input}
                    placeholder="Enter Room Number"
                />

                <label style={styles.label}>Patient IDs (comma separated):</label>
                <input
                    type="text"
                    value={patientInput}
                    onChange={(e) => setPatientInput(e.target.value)}
                    style={styles.input}
                    placeholder="Enter Patient IDs (e.g., 1, 2, 3)"
                />

                <button onClick={updatePatients} style={styles.button}>
                    Update Patients
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
    },
    header: {
        textAlign: "center",
        marginBottom: "20px",
    },
    title: {
        fontSize: "36px",
        fontWeight: "bold",
        color: "#333",
    },
    subtitle: {
        fontSize: "18px",
        color: "#555",
    },
    input: {
        width: "60%",
        padding: "12px",
        fontSize: "18px",
        border: "2px solid #555",
        borderRadius: "10px",
        marginBottom: "20px",
        textAlign: "center",
    },
    table: {
        width: "80%",
        fontSize: "20px",
        textAlign: "left",
        borderCollapse: "collapse",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        marginBottom: "40px",
    },
    thead: {
        backgroundColor: "rgba(200, 200, 200, 0.5)",
    },
    th: {
        padding: "20px",
        fontWeight: "bold",
        fontSize: "22px",
    },
    td: {
        padding: "18px",
        fontSize: "20px",
        fontWeight: "bold",
    },
    formContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        padding: "20px",
        borderRadius: "12px",
        width: "50%",
        textAlign: "center",
    },
    button: {
        backgroundColor: "black",
        color: "white",
        padding: "12px 20px",
        fontSize: "18px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default Room;
