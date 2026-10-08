const express = require("express");

const router = express.Router();

const db = require("../config/db");


/* =========================================
   GET ALL VEHICLES
========================================= */

router.get("/", async (req, res) => {

    try {

        const query = `
            SELECT id, name, category, price, stock_status
            FROM vehicles
        `;

        const [results] = await db.query(query);

        res.status(200).json(results);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error retrieving vehicles"
        });

    }

});


/* =========================================
   GET SINGLE VEHICLE
========================================= */

router.get("/:id", async (req, res) => {

    try {

        const vehicleId = req.params.id;

        const query = `
            SELECT id, name, category, price, stock_status
            FROM vehicles
            WHERE id = ?
        `;

        const [results] = await db.query(
            query,
            [vehicleId]
        );


        if (results.length === 0) {

            return res.status(404).json({
                message: "Vehicle not found"
            });

        }


        res.status(200).json(results[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error retrieving vehicle"
        });

    }

});


/* =========================================
   UPDATE VEHICLE PRICE AND STOCK STATUS
========================================= */

router.put("/:id", async (req, res) => {

    try {

        const vehicleId = req.params.id;

        const { price, stock_status } = req.body;


        /* -----------------------------------------
           VALIDATION
        ----------------------------------------- */

        if (
            price === undefined ||
            stock_status === undefined
        ) {

            return res.status(400).json({
                message: "Price and stock status are required"
            });

        }


        if (Number(price) < 0) {

            return res.status(400).json({
                message: "Price cannot be negative"
            });

        }


        if (
            stock_status !== "In Stock" &&
            stock_status !== "Out of Stock"
        ) {

            return res.status(400).json({
                message:
                    "Stock status must be In Stock or Out of Stock"
            });

        }


        /* -----------------------------------------
           UPDATE DATABASE

           IMPORTANT:
           Only price and stock_status are updated.
           Vehicle name is NOT changed.
        ----------------------------------------- */

        const query = `
            UPDATE vehicles
            SET price = ?, stock_status = ?
            WHERE id = ?
        `;


        const [results] = await db.query(
            query,
            [
                Number(price),
                stock_status,
                vehicleId
            ]
        );


        if (results.affectedRows === 0) {

            return res.status(404).json({
                message: "Vehicle not found"
            });

        }


        res.status(200).json({

            message:
                "Vehicle updated successfully"

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error updating vehicle"
        });

    }

});


module.exports = router;