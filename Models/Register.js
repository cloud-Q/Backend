import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    DateOfBirth: {type:String},
    Phone: {type: String},
    

});

const User = mongoose.model("User", registerSchema);
export default User;
