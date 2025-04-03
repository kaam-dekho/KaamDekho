const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// API for phone number verification (could be used for OTP-based login)
router.post("/login", async (req, res) => {
    const { phone } = req.body;
    
    if (!phone) {
        return res.status(400).json({ message: "Phone number is required." });
    }

    try {
        // Check if user already exists in the database
        const result = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);

        if (result.rows.length > 0) {
            // User exists, return user details
            res.status(200).json({
                message: "User exists.",
                user: result.rows[0],
            });
        } else {
            // User does not exist, prompt to register
            res.status(404).json({ message: "User not found. Please register." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
