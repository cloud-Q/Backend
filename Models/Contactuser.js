import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    email: { type: String, required: true },
    text: { type: String, required: true },
});

const ContactUser = mongoose.model("Contact", contactSchema);
export default ContactUser;
