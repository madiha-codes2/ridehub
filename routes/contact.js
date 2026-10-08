const express = require("express");

const router = express.Router();

const db = require("../config/db");

const adminAuth = require("../middleware/adminAuth");


/* =====================================================
   CREATE CONTACT MESSAGE
===================================================== */

router.post("/", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            message
        } = req.body;


        /* ===============================
           VALIDATION
        =============================== */

        if (
            !name ||
            !email ||
            !phone ||
            !message
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "All fields are required."

            });

        }


        /* ===============================
           INSERT INTO DATABASE
        =============================== */

        const sql = `
            INSERT INTO contacts
            (
                name,
                email,
                phone,
                message
            )
            VALUES (?, ?, ?, ?)
        `;


        const [result] = await db.execute(

            sql,

            [
                name.trim(),
                email.trim(),
                phone.trim(),
                message.trim()
            ]

        );


        /* ===============================
           SUCCESS RESPONSE
        =============================== */

        res.status(201).json({

            success: true,

            message:
                "Your message has been submitted successfully.",

            contactId:
                result.insertId

        });


    } catch (error) {

        console.error(
            "Contact form error:",
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
   GET ALL CONTACT MESSAGES - ADMIN ONLY
===================================================== */

router.get("/", adminAuth, async (req, res) => {

    try {

        const [contacts] = await db.execute(`
            SELECT
                id,
                name,
                email,
                phone,
                message,
                status,
                created_at
            FROM contacts
            ORDER BY created_at DESC
        `);

        res.json({

            success: true,

            data: contacts

        });

    } catch (error) {

        console.error(
            "Contact messages loading error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to load contact messages."

        });

    }

});

/* =====================================================
   UPDATE CONTACT MESSAGE STATUS - ADMIN ONLY
===================================================== */

router.put("/:id/status", adminAuth, async (req, res) => {

    const contactId = Number(req.params.id);

    const { status } = req.body;


    /* ===============================
       VALIDATION
    =============================== */

    if (!Number.isInteger(contactId)) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid contact message ID."

        });

    }


    if (
        status !== "Pending" &&
        status !== "Completed"
    ) {

        return res.status(400).json({

            success: false,

            message:
                "Invalid contact message status."

        });

    }


    try {

        const [result] = await db.execute(
            `
            UPDATE contacts
            SET status = ?
            WHERE id = ?
            `,
            [
                status,
                contactId
            ]
        );


        if (result.affectedRows === 0) {

            return res.status(404).json({

                success: false,

                message:
                    "Contact message not found."

            });

        }


        res.json({

            success: true,

            message:
                "Contact message status updated successfully."

        });

    } catch (error) {

        console.error(
            "Contact message status update error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to update contact message status."

        });

    }

});

module.exports = router;