import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [callUseeffect, setCallUseeffect] = useState(false);
  const [newPayment, setNewPayment] = useState({
    patient_id: "",
    admin_id: "",
    amount: "",
    pay_date: "",
    pay_method: "UPI",
    pay_status: "Due",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/payment/all")
      .then((res) => setPayments(res.data))
      .catch((err) => {
        toast.error("Failed to fetch payments");
        console.error(err);
      });
  }, [callUseeffect, setCallUseeffect]);

  const searchPayment = (e) => {
    const searchValue = e.target.value;
    setSearchId(searchValue);
  
    if (searchValue === "") {
      setCallUseeffect(!callUseeffect);
      return;
    }
  
    axios
      .get(`http://localhost:3000/admin/payment/search/${searchValue}`)
      .then((res) => setPayments(res.data))
      .catch((err) => {
        toast.error("Payment not found");
        console.error(err);
      });
  };
  

  const createPayment = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/admin/payment/create", newPayment)
      .then((res) => {
        toast.success("Payment created successfully!");
        setPayments([...payments, { ...newPayment, payment_id: res.data.paymentId }]);
        setNewPayment({
          patient_id: "",
          admin_id: "",
          amount: "",
          pay_date: "",
          pay_method: "UPI",
          pay_status: "Due",
        });
      })
      .catch((err) => {
        toast.error("Failed to create payment");
        console.error(err);
      });
  };

  const updatePaymentStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:3000/admin/payment/update-status/${id}`, { pay_status: newStatus })
      .then(() => {
        toast.success("Payment status updated!");
        setPayments(payments.map((p) => (p.payment_id === id ? { ...p, pay_status: newStatus } : p)));
      })
      .catch((err) => {
        toast.error("Failed to update payment status");
        console.error(err);
      });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5", fontFamily: "Arial, sans-serif" }}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter Payment ID or Patient ID"
          value={searchId}
          onChange={searchPayment}
          style={{
            padding: "8px",
            fontSize: "18px",
            border: "2px solid black",
            width: "50%",
            borderRadius: "5px",
          }}
        />
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          backgroundColor: "transparent",
          textAlign: "center",
        }}
      >
        <thead style={{ backgroundColor: "lightgrey", fontSize: "20px", fontWeight: "bold" }}>
          <tr>
            <th style={{ padding: "10px", borderBottom: "2px solid black" }}>Payment ID</th>
            <th style={{ padding: "10px", borderBottom: "2px solid black" }}>Patient ID</th>
            <th style={{ padding: "10px", borderBottom: "2px solid black" }}>Admin ID</th>
            <th style={{ padding: "10px", borderBottom: "2px solid black" }}>Amount</th>
            <th style={{ padding: "10px", borderBottom: "2px solid black" }}>Date</th>
            <th style={{ padding: "10px", borderBottom: "2px solid black" }}>Method</th>
            <th style={{ padding: "10px", borderBottom: "2px solid black" }}>Status</th>
            <th style={{ padding: "10px", borderBottom: "2px solid black" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.payment_id} style={{ fontSize: "18px" }}>
              <td style={{ padding: "8px" }}>{payment.payment_id}</td>
              <td style={{ padding: "8px" }}>{payment.patient_id}</td>
              <td style={{ padding: "8px" }}>{payment.admin_id}</td>
              <td style={{ padding: "8px" }}>{payment.amount}</td>
              <td style={{ padding: "8px" }}>{payment.pay_date}</td>
              <td style={{ padding: "8px" }}>{payment.pay_method}</td>
              <td style={{ padding: "8px", fontWeight: "bold" }}>{payment.pay_status}</td>
              <td style={{ padding: "8px" }}>
                {payment.pay_status !== "Paid" && (
                  <button
                    onClick={() => updatePaymentStatus(payment.payment_id, "Paid")}
                    style={{
                      padding: "8px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      backgroundColor: "black",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "8px",
                    }}
                  >
                    Mark as Paid
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "40px" }}></div>

      <h2 style={{ textAlign: "center", fontSize: "28px", fontWeight: "bold" }}>Create Payment</h2>
      <form onSubmit={createPayment} style={{ textAlign: "center" }}>
        <input
          type="number"
          placeholder="Patient ID"
          value={newPayment.patient_id}
          onChange={(e) => setNewPayment({ ...newPayment, patient_id: e.target.value })}
          style={{
            padding: "10px",
            fontSize: "18px",
            width: "35%",
            border: "2px solid black",
            marginBottom: "10px",
            appearance: "textfield",
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
          required
        />
        <input
          type="number"
          placeholder="Admin ID"
          value={newPayment.admin_id}
          onChange={(e) => setNewPayment({ ...newPayment, admin_id: e.target.value })}
          style={{
            padding: "10px",
            fontSize: "18px",
            width: "35%",
            border: "2px solid black",
            marginBottom: "10px",
            appearance: "textfield",
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={newPayment.amount}
          onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
          style={{
            padding: "10px",
            fontSize: "18px",
            width: "35%",
            border: "2px solid black",
            marginBottom: "10px",
            appearance: "textfield",
            WebkitAppearance: "none",
            MozAppearance: "textfield",
          }}
          required
        />
        <input
          type="date"
          value={newPayment.pay_date}
          onChange={(e) => setNewPayment({ ...newPayment, pay_date: e.target.value })}
          style={{ padding: "10px", fontSize: "18px", width: "35%", border: "2px solid black", marginBottom: "10px" }}
          required
        />
        <button type="submit" style={{ padding: "12px 25px", fontSize: "18px", fontWeight: "bold", backgroundColor: "black", color: "white", border: "none", cursor: "pointer", borderRadius: "8px" }}>
          Create Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentManagement;
