const express = require("express");
const session = require("express-session");
const cors = require("cors");

const db = require("./config/db");

const vehicleRoutes = require("./routes/vehicles");
const enquiryRoutes = require("./routes/enquiries");
const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");
const offerRoutes = require("./routes/offers");

const app = express();

const PORT = process.env.PORT || 5000;


// Middleware

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: false
        }
    })
);

// Routes

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/offers", offerRoutes);

// Test route

app.get("/", (req, res) => {

    res.send("RideHub Backend is Running!");

});


// Start server

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}`);

});