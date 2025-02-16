import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/admin/login", { email, password });
      if (response.status === 200) {
        localStorage.setItem("role", "admin");
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #e0e0e0, #f5f5f5)", // Light grey gradient
      padding: "20px",
    },
    formWrapper: {
      width: "100%",
      maxWidth: "400px",
      padding: "30px",
      borderRadius: "12px",
      background: "rgba(255, 255, 255, 0.3)", // More transparent for a subtle effect
      backdropFilter: "blur(10px)", // Soft blur effect
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)", // Soft shadow for depth
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#4f4f4f", // Dark grey for contrast
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "14px",
      color: "#777", // Medium grey
      marginBottom: "20px",
    },
    inputField: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "6px",
      border: "1px solid #bdbdbd", // Light grey border
      fontSize: "16px",
      outline: "none",
      background: "rgba(255, 255, 255, 0.5)", // Transparent input field
      transition: "border 0.3s, background 0.3s",
    },
    inputFocus: {
      border: "1px solid #9e9e9e", // Darker grey on focus
      background: "rgba(255, 255, 255, 0.7)",
    },
    button: {
      width: "100%",
      padding: "12px",
      background: "#9e9e9e", // Light grey button
      color: "white",
      fontSize: "16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    buttonHover: {
      background: "#757575", // Darker grey on hover
    },
    registerText: {
      fontSize: "14px",
      marginTop: "15px",
      color: "#777",
    },
    registerLink: {
      color: "#4f4f4f",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Admin Login</h2>
        <p style={styles.subtitle}>Enter your credentials to access the admin dashboard.</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.inputField}
            onFocus={(e) => (e.target.style.border = styles.inputFocus.border)}
            onBlur={(e) => (e.target.style.border = styles.inputField.border)}
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.inputField}
            onFocus={(e) => (e.target.style.border = styles.inputFocus.border)}
            onBlur={(e) => (e.target.style.border = styles.inputField.border)}
          />

          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.background = styles.buttonHover.background)}
            onMouseOut={(e) => (e.target.style.background = styles.button.background)}
          >
            Sign in
          </button>
        </form>

        <p style={styles.registerText}>
          Not registered?{" "}
          <a href="/register" style={styles.registerLink}>
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
