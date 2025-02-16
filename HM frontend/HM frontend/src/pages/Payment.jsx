import React, { useEffect, useState } from "react";
import PaymentCard from "../components/PaymentCard";

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const pid = localStorage.getItem("pid");

  useEffect(() => {
    console.log(localStorage.getItem("pid"));
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/admin/payment/search/${pid}`
        );
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    if (pid) {
      fetchPayments();
    }
  }, [pid]);

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0", // Light grey background
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2>Payment Details</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {payments.length > 0 ? (
          payments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))
        ) : (
          <p>No payment details found</p>
        )}
      </div>
    </div>
  );
};

export default Payment;
