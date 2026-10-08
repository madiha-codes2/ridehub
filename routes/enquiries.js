const express = require("express");

const router = express.Router();

const db = require("../config/db");

const adminAuth = require("../middleware/adminAuth");

/* =====================================================
   CREATE ENQUIRY
===================================================== */

router.post("/", async (req, res) => {

    try {

        const {
            vehicle_id,
            name,
            email,
            phone,
            message,
            type
        } = req.body;


        /* =================================================
           VALIDATION
        ================================================= */

        if (
            !vehicle_id ||
            !name ||
            !email ||
            !phone ||
            !message ||
            !type
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All required fields must be provided."

            });

        }


        /* =================================================
           CHECK VEHICLE EXISTS
        ================================================= */

        const [vehicles] = await db.execute(

            `
            SELECT id
            FROM vehicles
            WHERE id = ?
            `,

            [vehicle_id]

        );


        if (vehicles.length === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Selected vehicle was not found."

            });

        }


        /* =================================================
           INSERT ENQUIRY
        ================================================= */

        const sql = `

            INSERT INTO enquiries
            (
                vehicle_id,
                name,
                email,
                phone,
                message,
                type
            )

            VALUES (?, ?, ?, ?, ?, ?)

        `;

        const [result] = await db.execute(

            sql,

            [
                vehicle_id,
                name.trim(),
                email.trim(),
                phone.trim(),
                message.trim(),
                type.trim()
            ]

        );


        /* =================================================
           SUCCESS
        ================================================= */

        res.status(201).json({

            success: true,

            message:
                "Your enquiry has been submitted successfully.",

            enquiryId:
                result.insertId

        });


    } catch (error) {

        console.error(
            "Enquiry error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Something went wrong. Please try again."

        });

    }

});

/* =====================================================
   GET ALL ENQUIRIES - ADMIN
===================================================== */

router.get("/", adminAuth, async (req, res) => {

    try {

        const [enquiries] = await db.execute(`

            SELECT
                enquiries.id,
                enquiries.name,
                enquiries.email,
                enquiries.phone,
                enquiries.message,
                enquiries.type,
                enquiries.status,
                enquiries.created_at,
                vehicles.name AS vehicle_name

            FROM enquiries

            INNER JOIN vehicles
                ON enquiries.vehicle_id = vehicles.id

            ORDER BY enquiries.created_at DESC

        `);


        res.json({

            success: true,

            data: enquiries

        });


    } catch (error) {

        console.error(
            "Enquiries loading error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to load enquiries."

        });

    }

});


/* =====================================================
   UPDATE ENQUIRY STATUS - ADMIN
===================================================== */

router.put("/:id/status", adminAuth, async (req, res) => {

    const enquiryId =
        Number(req.params.id);

    const { status } =
        req.body;


    /* =================================================
       VALIDATION
    ================================================= */

    if (!Number.isInteger(enquiryId)) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid enquiry ID."

        });

    }


    if (
        status !== "Pending" &&
        status !== "Completed"
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid enquiry status."

        });

    }


    try {

        const [result] = await db.execute(

            `
            UPDATE enquiries

            SET status = ?

            WHERE id = ?
            `,

            [
                status,
                enquiryId
            ]

        );


        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Enquiry not found."

            });

        }


        res.json({

            success: true,

            message:
                "Enquiry status updated successfully."

        });


    } catch (error) {

        console.error(
            "Enquiry status update error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to update enquiry status."

        });

    }

});

module.exports = router;