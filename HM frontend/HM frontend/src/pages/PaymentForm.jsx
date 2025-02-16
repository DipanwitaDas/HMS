import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentForm = ({ paymentId, amount, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cvv: "",
    expiry: "",
  });
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!paymentId) {
      paymentId = localStorage.getItem("payment_id");
      return;
    }
    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    try {
      const statusResponse = await fetch(
        `http://localhost:3000/admin/payment/update-status/${paymentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pay_status: "Paid" }),
        }
      );

      if (!statusResponse.ok) throw new Error("Failed to update payment status");

      const methodResponse = await fetch(
        `http://localhost:3000/admin/payment/update-method/${paymentId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pay_method: "Card" }),
        }
      );

      if (!methodResponse.ok) throw new Error("Failed to update payment method");

      toast.success("Payment successful!");
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess();
      }
      localStorage.removeItem("payment_id");
      setTimeout(() => navigate("/payment"), 2000);
    } catch (error) {
      console.error("Error updating payment:", error);
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f3f4f6", padding: "24px" }}>
      <div style={{ backgroundColor: "#fff", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", borderRadius: "8px", padding: "24px", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", textAlign: "center", color: "#374151", marginBottom: "16px" }}>
          Payable Amount: <span style={{ color: "#16a34a" }}>₹{amount}</span>
        </h2>
        {step === 1 ? (
          <form onSubmit={handleCardSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#6b7280" }}>Enter Card Details</h3>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px" }}
            />
            <div style={{ display: "flex", gap: "12px" }}>
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={handleChange}
                required
                style={{ width: "30%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px" }}
              />
              <input
                type="text"
                name="expiry"
                placeholder="Expiry (MM/YY)"
                value={cardDetails.expiry}
                onChange={handleChange}
                required
                style={{ width: "70%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px" }}
              />
            </div>
            <button type="submit" style={{ width: "100%", backgroundColor: "#2563eb", color: "#fff", padding: "10px", borderRadius: "6px", cursor: "pointer" }}>
              Proceed to OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "500", color: "#6b7280" }}>Enter OTP</h3>
            <input
              type="text"
              placeholder="4-digit OTP"
              value={otp}
              onChange={handleOtpChange}
              maxLength="4"
              required
              style={{ width: "100%", padding: "8px", border: "1px solid #d1d5db", borderRadius: "6px", textAlign: "center", fontSize: "18px" }}
            />
            <button type="submit" style={{ width: "100%", backgroundColor: "#16a34a", color: "#fff", padding: "10px", borderRadius: "6px", cursor: "pointer" }}>
              Pay Now
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
