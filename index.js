import express from 'express';
import contactRoutes from './Routes/Contact.js';
import registerRoutes from './Routes/Register.js';
import emailRouter from './Routes/Emailtoall.js';
import loginRouter from './Routes/Login.js'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';


// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());




mongoose.connect('mongodb+srv://wwwcloud346:yFitvCMRXKaiXzuG@cluster0.rvqkg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('mongodb connected')).catch((err) => console.error('MongoDB connection error:', err));



    app.use('/', contactRoutes);
    app.use('/', registerRoutes);
    app.use('/', emailRouter);
    app.use('/', loginRouter); 


// this does not work for vercel , instead we have to use expoet statement
// app.listen(9000, () => {
//     console.log('Server is running on port 9000');
// });

export default app;
