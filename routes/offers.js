const express = require("express");
const db = require("../config/db");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();


/* =========================================================
   GET ALL OFFER STATUSES
   Used by both admin and customer Offers pages
========================================================= */

router.get("/", async (req, res) => {

    try {

        const [offers] = await db.query(
            "SELECT offer_number, status FROM offer_status ORDER BY offer_number"
        );

        res.json({
            success: true,
            data: offers
        });

    } catch (error) {

        console.error("Offer status loading error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load offer statuses"
        });

    }

});


/* =========================================================
   UPDATE OFFER STATUS
   Admin only
========================================================= */

router.put("/:offerNumber", adminAuth, async (req, res) => {

    const offerNumber =
        Number(req.params.offerNumber);

    const { status } = req.body;


    /* -----------------------------------------
       VALIDATION
    ----------------------------------------- */

    if (![1, 2, 3].includes(offerNumber)) {

        return res.status(400).json({
            success: false,
            message: "Invalid offer number"
        });

    }


    if (
        status !== "Active" &&
        status !== "Inactive"
    ) {

        return res.status(400).json({
            success: false,
            message: "Invalid offer status"
        });

    }


    try {

        const [result] = await db.query(
            `
            UPDATE offer_status
            SET status = ?
            WHERE offer_number = ?
            `,
            [status, offerNumber]
        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Offer not found"
            });

        }


        res.json({
            success: true,
            message: "Offer status updated successfully"
        });

    } catch (error) {

        console.error(
            "Offer status update error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to update offer status"
        });

    }

});


module.exports = router;