import express from "express";
import jwt from "jsonwebtoken";
import User from "../Models/Register.js";
import bcrypt from 'bcrypt';

const router = express.Router();


router.post('/login', async (req, res)=>{
    const {email, password} = req.body;

    try{
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.json({ success: false, error: 'Invalid email' });
        }
        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (!passwordMatch) {
            return res.json({ success: false, error: 'Invalid  password' });
          }

          const token = jwt.sign({ email }, 'secret-key', { expiresIn: '10h' });

          res.json({ success: true,message:"Thanks for login", data: token});
          console.log(token);
          } catch (error) {
           console.error('Error during login:', error);
          }});
    


export default router;
