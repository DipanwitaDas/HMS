import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCard = ({ payment }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Transparent background
        border: "1px solid black",
        borderRadius: "8px",
        padding: "16px",
        margin: "10px",
        width: "300px",
        color: "black",
      }}
    >
      <h4 style={{ fontWeight: "bold" }}>Payment ID: {payment.payment_id}</h4>
      <h3>Amount: ₹{payment.amount}</h3>
      <p>Status: {payment.pay_status}</p>
      {payment.pay_status === "Paid" ? (
        <p>Method: {payment.pay_method}</p>
      ) : (
        <button
          onClick={() => {
            localStorage.setItem("payment_id", payment.payment_id);
            navigate("/payment/form")
        }}
          style={{
            backgroundColor: "transparent",
            border: "1px solid black",
            padding: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "black";
            e.target.style.color = "white";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "black";
          }}
        >
          Pay Now
        </button>
      )}
    </div>
  );
};

export default PaymentCard;
