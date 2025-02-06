import express from "express";
import User from "../Models/Register.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';

dotenv.config();
const router = express.Router();

router.post("/register", async (req, res) => {
    const { name, email, password, DateOfBirth, Phone } = req.body;
    console.log("User Registration Data:", { name, email, password });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, error: "Email already registered, please use a different email" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);



        const newUser = await User.create({ name, email, password:hashedPassword, DateOfBirth, Phone   });
        console.log("User created:", newUser);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Registration Successful",
            html: `<p>Hello ${name},</p><p>Welcome to our platform!</p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log("Welcome email sent to:", email);

        res.json({ success: true, message: "Registration successful. Welcome email sent." });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


router.get('/user-details', async (req, res)=>{
    try {
        const users = await User.find();
        res.json({ success: true, data:users });

    } catch (error) {
        res.json({ success: false, error: 'Failed to retrieve user\'s data' });
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        console.log(req.params.id);
        const users = await User.findByIdAndDelete(req.params.id);
        res.json({ success: true, data:users });
    }catch (error) {
        res.json({ success: false, error: 'Failed to retrieve user\'s data' });
    }
})



export default router;
