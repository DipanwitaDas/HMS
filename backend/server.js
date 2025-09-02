const express = require('express');
const db = require('./db');
const patientRoute = require("./routes/patientRoute")
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const appointmentRoutes = require('./routes/appointmentRoute');
const adminRoute = require("./routes/adminRoute")
const adminDoctor = require("./routes/adminDoctorRoute")
const adminNurse = require("./routes/adminNurseRoute")
const adminPatient = require("./routes/adminPatientRoute")
const adminRoom = require("./routes/adminRoomRoute")
const adminPayment = require("./routes/adminPaymentRoute")
const adminAppointmentRoute = require("./routes/adminAppointmentRoute")

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(bodyParser.json()); // Middleware to parse JSON in request body
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies and credentials
}));

db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1); // Exit the app if the database connection fails
  }
  console.log('Connected to the MySQL database');
  connection.release(); // Release the connection back to the pool
});

app.get('/', (req, res) => {
  res.send('Hospital Management System Backend is Running');
});

app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS result', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json({ message: 'Database connected successfully', result: results[0].result });
  });
});

app.use('/patients', patientRoute);
app.use('/api', appointmentRoutes);
app.use("/admin", adminRoute);
app.use("/admin", adminAppointmentRoute);
app.use("/admin", adminDoctor);
app.use("/admin", adminNurse);
app.use("/admin", adminPatient);
app.use("/admin", adminRoom);
app.use("/admin/payment", adminPayment);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
