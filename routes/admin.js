const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();


/* =========================================================
   ADMIN LOGIN
========================================================= */

router.post("/login", async (req, res) => {

    const { email, password } = req.body;


    /* -----------------------------------------
       VALIDATION
    ----------------------------------------- */

    if (!email || !password) {

        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });

    }


    try {

        const [admins] = await db.query(
            "SELECT * FROM admins WHERE email = ?",
            [email]
        );


        /* -----------------------------------------
           ADMIN NOT FOUND
        ----------------------------------------- */

        if (admins.length === 0) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        const admin = admins[0];


        /* -----------------------------------------
           COMPARE PASSWORD
        ----------------------------------------- */

        const passwordMatches =
            await bcrypt.compare(
                password,
                admin.password
            );


        if (!passwordMatches) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        /* -----------------------------------------
           CREATE SESSION
        ----------------------------------------- */

        req.session.adminId = admin.id;


        /* -----------------------------------------
           SUCCESS
        ----------------------------------------- */

        res.json({
            success: true,
            message: "Login successful"
        });

    } catch (error) {

        console.error("Admin login error:", error);

        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });

    }

});


/* =========================================================
   ADMIN LOGOUT
========================================================= */

router.post("/logout", (req, res) => {

    req.session.destroy(function (error) {

        if (error) {

            return res.status(500).json({
                success: false,
                message: "Logout failed"
            });

        }


        res.clearCookie("connect.sid");


        res.json({
            success: true,
            message: "Logged out successfully"
        });

    });

});

router.get("/check", adminAuth, (req, res) => {

    res.json({
        success: true,
        message: "Admin authentication is working",
        adminId: req.session.adminId
    });

});

/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

router.get("/dashboard", adminAuth, async (req, res) => {

    try {

        /* -----------------------------------------
           TOTAL VEHICLES
        ----------------------------------------- */

        const [totalVehiclesResult] = await db.query(
            "SELECT COUNT(*) AS totalVehicles FROM vehicles"
        );


        /* -----------------------------------------
           IN STOCK VEHICLES
        ----------------------------------------- */

        const [inStockResult] = await db.query(
            "SELECT COUNT(*) AS inStockVehicles FROM vehicles WHERE stock_status = 'In Stock'"
        );


        /* -----------------------------------------
           OUT OF STOCK VEHICLES
        ----------------------------------------- */

        const [outOfStockResult] = await db.query(
            "SELECT COUNT(*) AS outOfStockVehicles FROM vehicles WHERE stock_status = 'Out of Stock'"
        );


        /* -----------------------------------------
           ACTIVE OFFERS
        ----------------------------------------- */

        const [activeOffersResult] = await db.query(
            "SELECT COUNT(*) AS activeOffers FROM offer_status WHERE status = 'Active'"
        );


        /* -----------------------------------------
           PENDING ENQUIRIES
        ----------------------------------------- */

        const [pendingEnquiriesResult] = await db.query(
            "SELECT COUNT(*) AS pendingEnquiries FROM enquiries WHERE status = 'Pending'"
        );


        /* -----------------------------------------
           PENDING CONTACT MESSAGES
        ----------------------------------------- */

        const [pendingContactsResult] = await db.query(
            "SELECT COUNT(*) AS pendingContacts FROM contacts WHERE status = 'Pending'"
        );


        /* -----------------------------------------
           SEND DATA
        ----------------------------------------- */

        res.json({
            success: true,
            data: {
                totalVehicles:
                    totalVehiclesResult[0].totalVehicles,

                inStockVehicles:
                    inStockResult[0].inStockVehicles,

                outOfStockVehicles:
                    outOfStockResult[0].outOfStockVehicles,

                activeOffers:
                    activeOffersResult[0].activeOffers,

                pendingEnquiries:
                    pendingEnquiriesResult[0].pendingEnquiries,

                pendingContacts:
                    pendingContactsResult[0].pendingContacts
            }
        });


    } catch (error) {

        console.error(
            "Dashboard statistics error:",
            error
        );


        res.status(500).json({
            success: false,
            message: "Unable to load dashboard statistics"
        });

    }

});

module.exports = router;