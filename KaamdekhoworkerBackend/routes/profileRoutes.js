const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// API to register a new user (first time)
router.post("/register", async (req, res) => {
    const { name, phone, dob, aadhar_number, profile_photo, gender, area } = req.body;

    if (!name || !phone || !dob || !aadhar_number || !gender || !area) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if user already exists
        const result = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);

        if (result.rows.length > 0) {
            return res.status(400).json({ message: "User already registered." });
        }

        // Insert new user into the database
        const newUser = await pool.query(
            "INSERT INTO users (name, phone, dob, aadhar_number, profile_photo, gender, area) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [name, phone, dob, aadhar_number, profile_photo, gender, area]
        );

        res.status(201).json({
            message: "User registered successfully.",
            user: newUser.rows[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

// API to update existing user profile
router.put("/update/:userId", async (req, res) => {
    const { userId } = req.params;
    const { name, dob, aadhar_number, profile_photo, gender, area } = req.body;

    try {
        // Update user details
        const updatedUser = await pool.query(
            "UPDATE users SET name = $1, dob = $2, aadhar_number = $3, profile_photo = $4, gender = $5, area = $6 WHERE id = $7 RETURNING *",
            [name, dob, aadhar_number, profile_photo, gender, area, userId]
        );

        if (updatedUser.rows.length > 0) {
            res.status(200).json({
                message: "User profile updated successfully.",
                user: updatedUser.rows[0],
            });
        } else {
            res.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;
