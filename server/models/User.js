import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // otp: {
    //     type: Number,
    //     required: true
    // },
    name: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', UserSchema);
export default User;
