import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("role");
    navigateTo("/");
  };
  
  const styles = {
    navbar: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      background: "rgba(255, 255, 255, 0.2)", // Transparent Background
      backdropFilter: "blur(10px)", // Blur Effect
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft Shadow
      padding: "15px 30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      zIndex: 1000,
    },
    navLinks: {
      display: "flex",
      flexDirection: show ? "column" : "row",
      gap: "20px",
      alignItems: "center",
    },
    button: {
      backgroundColor: "black",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "bold",
      transition: "background 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#333",
    },
    hamburger: {
      fontSize: "24px",
      cursor: "pointer",
      display: "none",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#333", fontSize: "18px", fontWeight: "bold" }}>
          Home
        </Link>
        {role === "admin" && (
          <>
            <Link to="/admin/appointments" style={styles.button}>Appointments</Link>
            <Link to="/admin/doctor" style={styles.button}>Doctor</Link>
            <Link to="/admin/nurse" style={styles.button}>Nurse</Link>
            <Link to="/admin/patients" style={styles.button}>Patients</Link>
            <Link to="/admin/room" style={styles.button}>Rooms</Link>
            <Link to="/admin/payment" style={styles.button}>Payment</Link>
          </>
        )}
        {!role && isAuthenticated ? (
          <>
            <Link to="/appointment" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>
              Appointment
            </Link>
            <Link to="/payment" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>
              Bill
            </Link>
            <Link to="/about" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>
              About Us
            </Link>
          </>
        ):
        <>
        <Link to="/about" style={{ textDecoration: "none", color: "#333", fontSize: "18px" }}>
              About Us
         </Link>
        </>}
      </div>

      <div style={styles.navLinks}>
        {isAuthenticated || role ? (
          <button style={styles.button} onClick={handleLogout}>LOGOUT</button>
        ) : (
          <>
            <button style={{ ...styles.button, backgroundColor: "transparent", color: "black", border: "1px solid black" }} onClick={() => navigateTo("/login")}>
              LOGIN
            </button>
            <button style={styles.button} onClick={() => navigateTo("/admin/login")}>ADMIN LOGIN</button>
          </>
        )}
      </div>

      <div style={styles.hamburger} onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
