import express from "express";
import ContactUser from "../Models/Contactuser.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/contact", async (req, res) => {
    const { email, text } = req.body;
    console.log("User Query Data:", { email, text });

    try {
        const contactResult = await ContactUser.create({ email, text });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const contactMail = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Inquiry has been received",
            html: `<p>Hello ${email},</p><p>We have registered your request.</p>`,
            attachments: [
                {
                filename: 'Receipt.pdf',
                path:'one.pdf' 
                }
                ],
        };

        await transporter.sendMail(contactMail);
        console.log("Inquiry email sent to:", email);

        res.json({ success: true, message: "Query registered successfully" });
    } catch (error) {
        console.error("Query Sending Error:", error);
        res.status(500).json({ success: false, error: "Failed to process your query" });
    }
});

router.get('/contact-data', async (req, res)=>{
    try{
        const contacts = await ContactUser.find();
        res.json({success: true, data: contacts})
    } catch (error){
        res.json({success: false, error: 'failed to retrive contacts'})
    }
})


export default router;
