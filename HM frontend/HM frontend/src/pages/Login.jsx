import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/patients/login?appli", {
        method: "POST",
        credentials: "include", // Include credentials like cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          role: "Patient",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setIsAuthenticated(true);
        localStorage.setItem("pid", data.patient.patient_id, "role" , "user");

        // Clear form fields
        setEmail("");
        setPassword("");
        toast.success("Login successful");
        navigateTo("/");
      } else {
        toast.error("All fields are required");
        throw new Error(data.message || "Invalid email or password.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Login failed.");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
        <p>
          TechCare Hospital Management System is a comprehensive solution
          designed to streamline and optimize hospital operations, ensuring
          seamless patient care and efficient administration. It integrates key
          functions such as patient registration, appointment scheduling,
          electronic health records (EHR), billing, inventory management, and
          staff coordination into a unified platform. By reducing paperwork and
          minimizing errors, TechCare HMS enhances workflow efficiency, improves
          interdepartmental communication, and ensures data security. With
          advanced features like real-time monitoring and analytics, it empowers
          healthcare professionals to deliver high-quality services while
          maximizing hospital resources for better patient outcomes.
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
