import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../Models/Register.js";

dotenv.config();
const router = express.Router();

router.post('/emailAll', async (req, res) => {
    console.log("Received Data:", req.body);
    const { subject, content } = req.body;

    try {
        const users = await User.find();  

        if (!users.length) {
            return res.status.json({ success: false, message: "No users found" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });


        users.forEach(async (e) => {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: e.email, 
                subject: subject,  
                html: `<p>Hello ${e.name},</p><p>${content}</p>`,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log(`Email sent to: ${e.email}`);
            } catch (error) {
                console.error(`Failed to send email to ${e.email}:`, error);
            }
        });

        res.json({ success: true, message: "Emails are being sent" });
    } catch (error) {
        console.error("Error retrieving users:", error);
        res.status.json({ success: false, error: "Internal Server Error" });
    }
});

export default router;
