import express from "express";
import User from "../Models/Register.js";
import jwt from "jsonwebtoken"; 


const router = express.Router();

router.get('/account-details', async (req, res) => {
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.json({ error: 'TOken not Provided' });
        }
    
        jwt.verify(token, 'secret-key', async (err, decoded) => {
            if (err) {
                return res.json({ merror: 'Invalid token' });
            }
    
            console.log("Decoded Token:", decoded); // Debugging
            
            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                return res.json({ error: 'User not found' });
            }
    
            const accountInfo ={
                name: user.name,
                email: user.email,
                DateOfBirth: user.DateOfBirth,
                phone: user.Phone,
            }
    
            res.json({ accountInfo:accountInfo });
        })
        
    }catch(err){
        console.error("Error fetching cart items", err)
        res.json({ message: 'Internal Server Error' });
    }
    
})



export default router;