import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async(req, res) => {
    try {
        let { email, password, name } = req.body;
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User with this email already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name: name,
            email: email,
            password: securedPassword
        })

        return res.status(200).json({ success: true, message: "User registed successfully!", user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }
        
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}